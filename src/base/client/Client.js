import { BaseClient } from "./BaseClient.js";
import { WebSocketManager } from "./WebSocket/Manager.js";
import Status from "../types/enums/client/Status.js";
import Events from "./WebSocket/events/Events.js";
import { s } from "@sapphire/shapeshift";
import { GuildManager } from "./Managers/GuildManager.js";
import { ChannelManager } from "./Managers/ChannelManager.js";
import { config } from "dotenv";
import { Intents } from "./BitFields/Intents.js";

const defaultOptions = {
  failIfNotExists: false,

  intents: 3276799,
  partials: [],

  shards: 1,
  shardCount: 1,

  closeTimeout: 5000,
  waitGuildTimeout: 15000,

  allowedMentions: {
    parse: [],
    users: false,
    roles: false
  },

  properties: {
    browser: "Edge",
    device: "Computer",
    os: "Linux"
  },

  ws: {
    compress: false,
    large_thresold: 250,
    version: 10
  },

  presence: {
    activities: [],
    status: "online",
  }
};

export class Client extends BaseClient {
  /**
   * Create new Client.
   * @param {string} token 
   * @param {defaultOptions} options 
   * @constructor
   */
  constructor(token = null, options) {
    super();

    /**
     * @readonly
     */
    this.Events = Events;

    /**
     * Provided client options.
     * @readonly
     * @type {defaultOptions}
     */
    this.options = options;

    /**
     * Default client options.
     * @default
     * @readonly
     * @type {defaultOptions}
     */
    this.defaultOptions = defaultOptions;

    /**
     * Bot Token
     * @private
     */
    this.token = token;

    /**
     * WebSocket Manager for Gateway Connection
     * @readonly
     * @private
     */
    this.ws = new WebSocketManager(this);

    /**
     * Client Guilds
     * @readonly
     */
    this.guilds = new GuildManager(this);

    /**
     * Client Channels
     * @readonly
     */
    this.channels = new ChannelManager(this);
  };

  /**
   * Client Status
   * @readonly
   */
  status = Status.NotConnected;

  /**
   * Connect to Gateway.
   * @returns {this}
   */
  login() {
    if (this.status === Status.Ready) return null;

    this.ws.connect();

    return this;
  };

  /**
   * Set client options.
   * @param {defaultOptions} options 
   * @returns {this}
   */
  setOptions(options) {
    if (typeof options !== "object") throw new Error("'options' must be Object.");

    this.options = options;

    return this;
  };

  /**
   * Set bot token.
   * @param {string} secret
   * @returns {this}
   */
  setToken(secret) {
    s.string.parse(secret);

    this.token = secret;

    return this;
  };

  /**
   * Get bot token
   * @returns {string | null}
   */
  fetchToken() {
    config({ override: true });

    let token = (process.env["TOKEN"] ?? this.token);

    return token;
  };
};