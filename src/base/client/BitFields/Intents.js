import { BitField } from "./Base.js";

import IntentsFlags from "../../types/enums/bitfields/Intents.js";

/**
 * IntentsBitField
 * @extends BitField
 */
export class Intents extends BitField {
  /**
   * 
   * @param  {...IntentsFlags} intents
   * @constructor
   */
  constructor(...intents) {
    super(...intents);
  };

  /**
   * @readonly
   */
  static Flags = IntentsFlags;

  /** 
   * @readonly
   */
  static PRIVILEGED = {
    GUILD_PRESENCES: true,
    GUILD_MEMBERS: true,
    MESSAGE_CONTENT: true,
  };

  /**
   * Calculates intents
   * @param  {...Intents} intents 
   * @returns {Number}
   */
  calculateIntents(...intents) {
    return intents.reduce((acc, intent) => acc | (1 << intent), 0);
  }

  /**
   * Is intent Privileged.
   * @param {Intents} intent 
   * @returns 
   */
  isPrivileged(intent) {
    return !!Object.prototype.hasOwnProperty.call(this.constructor.PRIVILEGED, intent);
  }
}

console.log(new Intents().calculateIntents(IntentsFlags.Intents.GuildMessages, IntentsFlags.Intents.GuildInvites))