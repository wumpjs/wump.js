import WebSocket from "ws";

import EventEmitter from "node:events";

import Events from "../../types/enums/websocket/WebSocketEvents.js";

import { Client } from "../Client.js";

import { s } from "@sapphire/shapeshift";

import { readdirSync } from "node:fs";
import { URL } from "node:url";
import { ActionManager } from "./Action.js";
const eventsPath = (new URL("./events/dist", import.meta.url).pathname).substring(1);

import OpCodes from "../../types/enums/gateway/OpCodes.js";
import ClientStatus from "../../types/enums/client/Status.js";

export class WebSocketManager extends EventEmitter {
  /**
   * Create new gateway connection.
   * @param {Client} client WumpJS Client
   * @constructor
   */
  constructor(client) {
    super({ captureRejections: true });

    /**
     * WebSocket Events
     * @readonly
     */
    this.Events = Events;

    /**
     * WumpJS Client
     * @type {Client}
     * @readonly
     */
    this.client = client;

    /**
     * WebSocket Setup
     * @type {WebSocket}
     * @protected
     */
    this.ws = new WebSocket(this.createGatewayURL(), { perMessageDeflate: false });

    /**
     * WebSocket Status
     * @type {boolean}
     * @readonly
     */
    this.status = null;

    /**
     * Packet queue
     * @type {Array<{ name: string, action: ActionManager }>}
     * @protected
     */
    this.packetQueue = [];
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

    const options = (this.client?.options ?? this.client.defaultOptions);

    let heartbeatInterval;

    this.ws.once(this.Events.Open, async () => {
      const json = {
        op: OpCodes.Identify,
        d: { token }
      };

      let editedJSON = Object.assign(json.d, options);

      this.send(json);

      const actions = readdirSync(eventsPath).filter((event) => event.endsWith(".js"));
      for (let index = 0; index < actions.length; index++) {
        const event = actions[index];

        /**
         * @type {ActionManager}
         */
        const action = (new ((await import(`./events/dist/${event}`)).default)(this.client));

        this.packetQueue.push({ name: (event.split(".js")[0]), action });
      };

      this.status = ClientStatus.Ready;
    });

    this.ws.on(this.Events.Message, async (data) => {
      const payload = JSON.parse(data);
      const { t, d, op } = payload;

      if (op === OpCodes.Hello) heartbeatInterval = this.heartbeat(d.heartbeat_interval);

      if (t) {
        const packets = this.packetQueue.filter((packet) => packet.name === t);

        for (let index = 0; index < packets.length; index++) {
          const packet = packets[index];

          packet.action.execute(d).then(() => {
            const getIndex = packets.indexOf({ name: packet.name, action: packet.action });
            if (getIndex > -1) packets.splice(getIndex, (getIndex + 1));
          }).catch(console.error);
        };
      };
    });

    this.ws.on(this.Events.Error, (code, reason) => {
      clearInterval(heartbeatInterval);

      this.status = ClientStatus.NotConnected;

      throw new Error(code, String(reason));
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
    }, time).unref();

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