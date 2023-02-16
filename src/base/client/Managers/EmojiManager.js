import { CachedManager } from "./CachedManager.js";

import { Storage } from "@wumpjs/storage";

import { Client } from "../Client.js";

/**
 * Creates new Emoji Manager for Emojis.
 * @extends CachedManager
 * @abstract
 */
export class EmojiManager extends CachedManager {
  /**
   * @param {Client} client 
   * @constructor
   */
  constructor(client, emoji) {
    super(client);

    /**
     * @type {Storage}
     * @readonly
     * @private
     */
    this._cache = this.createCache();

    this.id = emoji.id;
    this.name = emoji.name ?? null;
    this.isAnimated = emoji.animated ?? null;
  };

  get identifier() {
    if (this.id) return `${this.isAnimated ? 'a:' : ''}${this.name}:${this.id}`;
    return encodeURIComponent(this.name);
  }

  get url() {
    return //this.id && Endpoint gerek
  }

  get createdTimestamp() {
    return this.id && timestamp(this.id);
  }

  get createdAt() {
    return this.id && new Date(this.createdTimestamp);
  }

  /**
   * Guild Cache
   * @readonly
   */
  get cache() {
    return this._cache;
  };

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      animated: this.isAnimated
    }
  };
};