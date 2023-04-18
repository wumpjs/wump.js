import { s } from "@sapphire/shapeshift";

import { BitField as BaseBitField, enumToObject } from "@sapphire/bitfield";

/**
 * BaseBitField
 */
export class BitField extends BaseBitField {
  /**
   * @param  {...(number | string | bigint)} fields 
   * @constructor
   */
  constructor(...fields) {
    s.string.array.parse(fields);

    /**
     * @private
     */
    this.fields = fields;

    /**
     * Bit Fields
     * @readonly
     */
    this.data = {};
  };

  /**
   * @readonly
   * @static
   */
  static Flags = {};
};