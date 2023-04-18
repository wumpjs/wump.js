import { CachedManager } from "./CachedManager.js";

import { Storage } from "@wumpjs/storage";

import { Client } from "../Client.js";

/**
 * Creates new Guild Manager for Guilds.
 * @extends CachedManager
 * @abstract
 */
export class GuildManager extends CachedManager {
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

  /**
   * Get guild members.
   * @param {object} data
   * @returns {object[]}
   * @private
   */
  fetchMembers(data) {    
    const guild = data;

    let result = [];

    if (!guild) return result;

    for (let index = 0; index < guild.members.length; index++) {
      const member = guild.members[index];
      const { user, roles, premium_since, pending, nick, mute, joined_at, flags, deaf, communication_disabled_until, avatar } = member;

      const memberObject = {
        user: this.createUserInterface(user),

        id: user.id,
        roles,
        premiumSince: premium_since,
        pending,
        nickName: nick,
        isMuted: mute,
        isDeafed: deaf,
        joinedAt: new Date(joined_at),
        flags,
        communicationDisabledUntil: communication_disabled_until,
        avatar
      };

      if (this.client.members.cache.has(user.id)) result.push(memberObject);
      else {
        this.client.members.cache.set(user.id, memberObject);

        result.push(memberObject);
      };
    };

    return result;
  };

  /**
   * Get guild members count.
   * @param {object} data
   * @returns {number}
   * @private
   */
  fetchMembersCount(data) {
    const guild = data;

    return (guild?.member_count ?? 0);
  };

  /**
   * Get guild channels.
   * @param {object} data
   * @returns {object[]}
   * @private
   */
  fetchChannels(data) {
    const guild = data;

    let result = [];

    if (!guild) return result;

    for (let index = 0; index < guild.channels.length; index++) {
      const channel = guild.channels[index];
      const { name, topic, rate_limit_per_user, position, permission_overwrites, last_pin_timestamp, last_message_id, id, flags, default_thread_rate_limit_per_user } = channel;

      const channelObject = {
        name,
        topic,
        rateLimitPerUser: rate_limit_per_user,
        position,
        permissions: permission_overwrites,
        lastPinDate: new Date(last_pin_timestamp),
        lastMessageId: last_message_id,
        id,
        flags,
        threadRateLimitPerUser: default_thread_rate_limit_per_user,
        bitrate: channel?.bitrate ?? null
      };

      if (this.client.channels.cache.has(id)) result.push(channelObject);
      else {
        this.client.channels.cache.set(id, channelObject);

        result.push(channelObject);
      };
    };

    return result;
  };

  /**
   * Get guild stickers.
   * @param {object} data 
   * @returns {object[]}
   * @private
   */
  fetchStickers(data) {
    const guild = data;

    let result = [];

    if (!guild) return result;

    for (let index = 0; index < guild.stickers.length; index++) {
      const sticker = guild.stickers[index];
      const { id, pack_id, name, description, tags: _tags, type, format_type, available, guild_id, user, sort_value } = sticker;

      const splittedTags = String(_tags).split(",");
      const tags = [];

      for (let i = 0; i < splittedTags.length; i++) {
        const tag = splittedTags[i];

        tags.push(tag);
      };

      const stickerObject = {
        author: this.createUserInterface(user),

        id,
        packId: pack_id,
        name,
        description,
        tags,
        type: (type === 1 ? "Standart" : "Guild"),
        formatType: (format_type === 1 ? "PNG" : (format_type === 2 ? "APNG" : (format_type === 3 ? "LOTTIE" : "GIF"))),
        isAvailable: available,
        guild,
        sortValue: sort_value
      };

      if (this.client.stickers.cache.has(id)) result.push(stickerObject);
      else {
        this.client.stickers.cache.set(id, stickerObject);

        result.push(stickerObject);
      };
    };

    return result;
  };

  /**
   * Creates new user object.
   * @param {object} user 
   * @private
   */
  createUserInterface(user) {
    if (!user) return {};

    return {
      id: user?.id,
      username: user?.username,
      tag: `${user?.username}#${user?.discriminator}`,
      discrim: user?.discriminator,
      isBot: user?.bot ?? null,
      isNotBot: (user?.bot === false ? true : false),
      isSystem: user?.system ?? null,
      isNotSystem: (user?.system === false ? true : false),
      avatarDecoration: user?.avatar_decoration,
      avatar: user?.avatar,
      isMFAEnabled: user?.mfa_enabled,
      banner: user?.banner,
      accentColor: user?.accent_color,
      locale: user?.locale,
      verified: user?.verified,
      email: user?.email,
      flags: user?.flags,
      premiumType: user?.premium_type,
      publicFlags: user?.public_flags
    };
  };
};