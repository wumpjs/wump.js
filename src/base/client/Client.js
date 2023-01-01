import { BaseClient } from "./BaseClient.js";

import { WebSocketManager } from "../websocket/WebSocketManager.js";

export class Client extends BaseClient { 
  constructor(token = null, options = {
    failIfNotExists: true,

    intents: 7,
    partials: [],

    shards: 1,
    shardCount: 1,

    makeCache: null,

    closeTimeout: 5_000,
    waitGuildTimeout: 15_000,

    allowedMentions: {
      parse: [],
      users: false,
      roles: false
    },

    ws: {
      compress: false,
      large_thresold: 250,
      properties: {
        browser: "Edge",
        device: "Edge",
        os: "Windows"
      }
    }
  }) {
    super();

    this.ws = new WebSocketManager(this);
  };

  isReady = false;
  
  login() {

  };
};