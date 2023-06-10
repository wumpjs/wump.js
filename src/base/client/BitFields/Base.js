import { s } from "@sapphire/shapeshift";

/**
 * BaseBitField
 */
export class BitField {
  /**
   * @param  {...number | string | bigint} bitfields 
   * @constructor
   */
  constructor(...bitfields) {
    s.string.array.parse(bitfields);

    /**
     * @private
     */
    this.bitfields = bitfields;

    /**
     * Bit Fields
     * @readonly
     */
    this.data = bitfields.reduce((acc, bitfield) => acc | this.constructor.resolve(bitfield), 0);
  };

  /**
   * @readonly
   */
  static Flags = {};

  add(...bitfields) {
    for (const bitfield of bitfields) {
      this.data |= this.constructor.resolve(bitfield);
    }
  }

  remove(...bitfields) {
    for (const bitfield of bitfields) {
      this.data &= ~this.constructor.resolve(bitfield);
    }
  }

  has(bitfield) {
    return (this.data & this.constructor.resolve(bitfield)) !== 0;
  }

  toJSON() {
    return this.data;
  }

  static resolve(bitfield) {
    if (typeof bitfield === 'string') {
      if (bitfield in this.Flags) {
        return this.Flags[bitfield];
      }
      throw new Error(`Invalid bitfield: ${bitfield}`);
    } else if (typeof bitfield === 'number') {
      return bitfield;
    }
    throw new Error(`Invalid bitfield: ${bitfield}`);
  }
}