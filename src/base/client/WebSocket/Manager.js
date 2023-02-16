import WebSocket from "ws";

import EventEmitter from "node:events";

import Events from "../../types/enums/websocket/WebSocketEvents.js";

import { Client } from "../Client.js";

import { s } from "@sapphire/shapeshift";

import { readdirSync } from "node:fs";
import { URL } from "node:url";
const eventsPath = (new URL("./events/default", import.meta.url).pathname).substring(1);

import { Storage } from "@wumpjs/storage";
const eventsData = new Storage(128);

import OpCodes from "../../types/enums/gateway/OpCodes.js";
import ClientStatus from "../../types/enums/client/Status.js";

export class WebSocketManager extends EventEmitter {
  /**
   * Create new gateway connection.
   * @param {Client} client WumpJS Client
   * @constructor
   */
  constructor(client) {
    super();

    /**
     * WebSocket Events
     * @readonly
     */
    this.Events = Events;

    /**
     * WumpJS Client
     * @readonly
     */
    this.client = client;

    /**
     * WebSocket Setup
     * @readonly
     * @protected
     */
    this.ws = new WebSocket(this.createGatewayURL());

    /**
     * WebSocket Status
     * @readonly
     */
    this.status = null;

    /**
     * Sequence
     * @protected
     */
    this.sequence = -1;
  };

  /**
   * Create new Gateway URL.
   * @param {number} version 
   * @param {boolean} compress 
   * @returns {string}
   * @protected
   */
  createGatewayURL(version = (((this.client?.options ?? this.client.defaultOptions)?.ws?.version) ?? 10), compress = (((this.client?.options ?? this.client.defaultOptions)?.ws?.compress) ?? false)) {
    s.number.parse(version);
    s.boolean.parse(compress);

    const url = `wss://gateway.discord.gg/?v=${version}&encoding=json&compress=${compress}`;

    return url;
  };

  /**
   * Send payload to Gateway.
   * @param {object} payload 
   * @returns {void}
   */
  send(payload) {
    const handled = JSON.stringify(payload);

    this.ws.send(handled);

    return void 0;
  };

  connect() {
    const token = this.client.fetchToken();
    if (!token) throw new RangeError("INVALID_TOKEN", `Please provide token. (Received: '${token}')`);

    s.string.parse(token);

    const options = (this.client?.options ? this.client.options : this.client.defaultOptions);

    let heartbeatInterval;

    this.ws.once(this.Events.Open, async () => {
      const json = {
        op: OpCodes.Identify,
        d: { token }
      };

      let editedJSON = Object.assign(json.d, options);

      this.send(json);

      readdirSync(eventsPath).filter((event) => event.endsWith(".js")).map(async (event) => {
        const action = new (await import(`./events/default/${event}`)).default(this.client);

        return eventsData.set(event.split(".js")[0], action);
      });

      this.status = ClientStatus.Ready;
    });

    this.ws.on(this.Events.Error, (code, reason) => {
      clearInterval(heartbeatInterval);

      this.status = ClientStatus.NotConnected;

      throw new Error(code, String(reason));
    });

    this.ws.on(this.Events.Message, async (data) => {
      const payload = JSON.parse(data);
      const { t, d, op } = payload;

      if (op === OpCodes.Hello) heartbeatInterval = this.heartbeat(d.heartbeat_interval);

      if (t) {
        const action = eventsData.fetch(t);
        if (!action) return;

        action.execute(d);
      };
    });

    this.ws.on(this.Events.Close, (code, reason) => console.log(`Error[${code}]: ${reason ?? "None"}`));
  };

  /**
   * Send heartbeat.
   * @param {number} time HeartBeat Interval Second
   * @returns {NodeJS.Timer}
   */
  heartbeat(time) {
    s.number.parse(time);

    if (this.status !== ClientStatus.Ready) return;

    let interval = setInterval(() => {
      this.send({ op: OpCodes.HeartBeat, d: null });
      console.log("HeartBeat sended.");
    }, (time)).unref();

    return interval;
  };

  /**
   * Get bot gateway.
   * @protected
   */
  fetchGateway() {
    throw new Error("NOT_IMPLEMENTED", "This method is not implemented.");
  };
};