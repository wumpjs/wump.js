import { CachedManager } from "./CachedManager.js";

import { Storage } from "@wumpjs/storage";

import { Client } from "../Client.js";

/**
 * Creates new Channel Manager for Channels.
 * @extends CachedManager
 * @abstract
 */
export class ChannelManager extends CachedManager {
  /**
   * @param {Client} client 
   * @constructor
   */
  constructor(client) {
    super(client);

    /**
     * @type {Storage}
     * @readonly
     * @private
     */
    this._cache = this.createCache();
  };

  /**
   * Guild Cache
   * @readonly
   */
  get cache() {
    return this._cache;
  };

  /**
   * 
   * @param {object} data
   * @returns {any}
   */
  _add(data) {
    if (!data?.id) return;

    let result = null;

    if (this.cache.has(data.id)) result = this.cache.fetch(data.id);
    else {
      const channels = this.fetchChannels(data);
      const members = this.fetchMembers(data);
      const stickers = this.fetchStickers(data);
      const memberCount = this.fetchMembersCount(data);

      const guildObject = {
        channels,
        members,
        stickers,
        memberCount
      };

      result = this.cache.set(data.id, guildObject);
    };

    return result;
  };
};