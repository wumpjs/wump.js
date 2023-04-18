import { Client } from "../Client.js";

import Events from "./events/Events.js";

import { s } from "@sapphire/shapeshift";

export class ActionManager {
  /**
   * Action (Event) Manager for Client
   * @param {Client} client
   * @constructor
   */
  constructor(client) {
    /**
     * @type {Client}
     * @readonly
     */
    this.client = client;
  };

  /**
   * Event List
   * @readonly
   * @protected
   */
  Events = Events;

  /**
   * Action.
   * @param {object} data 
   * @returns {Promise<void>}
   * @protected
   */
  async execute(data) {
    return data;
  };

  /**
   * Emit client.
   * @param {...any} data
   * @returns {void}
   * @protected
   */
  send(...data) {
    this.client.emit(this.toString(), ...data);

    return void 0;
  };

  /**
   * Event Name
   * @returns {string}
   */
  toString() {
    return (this.Events[this.constructor.name]);
  };
};