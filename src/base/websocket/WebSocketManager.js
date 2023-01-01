import WebSocket from "ws";

import EventEmitter from "node:events";

import { WebSocketEvents } from "./Events.js";

export class WebSocketManager extends EventEmitter {
  constructor(client) {
    this.client = client;
  };

  heartbeat() {

  };

  connect() {

  };

  static Events = WebSocketEvents;
};