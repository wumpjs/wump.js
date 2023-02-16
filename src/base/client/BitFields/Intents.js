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
   * Intents
   * @readonly
   */
};