import { Client } from "../Client.js";

/**
 * @abstract
 */
export class BaseManager {
  /**
   * Create new Manager.
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
};