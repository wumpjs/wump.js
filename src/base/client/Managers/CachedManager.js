import { BaseManager } from "./BaseManager.js";

import { Storage } from "@wumpjs/storage";

import { Client } from "../Client.js";

import { s } from "@sapphire/shapeshift";

/**
 * @extends BaseManager
 * @abstract
 */
export class CachedManager extends BaseManager {
  /**
   * Create new Cache Manager.
   * @param {Client} client
   * @constructor
   */
  constructor(client) {
    super(client);
    
    /**
     * @type {Client}
     * @readonly
     */
    this.client = client;
  };

  /**
   * Creates new Storage.
   * @param {number} size 
   * @returns {Storage<any>}
   * @private
   */
  createStorage(size = 1099511627776) {
    s.number.parse(size);

    const storage = new Storage(size);

    return storage;
  };

  /**
   * Creates new Cache.
   * @param {number} size 
   * @returns {Storage<any>}
   * @private
   */
  createCache(size) {
    const cache = this.createStorage(size);

    return cache;
  };
};