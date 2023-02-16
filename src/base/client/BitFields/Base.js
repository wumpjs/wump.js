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
    this.data = [];

    for (let index = 0; index < bitfields.length; index++) this.data.push(this.resolve(bitfields[ index ]));
  };

  /**
   * @readonly
   */
  static Flags = {};

  add(...bitfield) {
    // nasıl deniyoruz komut ne ne komutu direkt intents'i başlattım node ile tmm console access ver pls
    for (const bit of bits) {

    }
  };

  remove(...bitfield) {

  };

  has(bitfield) {

  };

  toJSON() {
    return (typeof this.bitfields === 'number' ? this.bitfields : this.bitfields.toString());
  };

  static resolve(bitfield) {
    if (typeof bitfield === 'string') {
      if (bitfield in this.constructor?.Flags) {
        return this.constructor?.Flags[ bitfield ];
      }
      throw new Error(`Invalid bitfield: ${bitfield}`);
    } else if (typeof bitfield === 'number') {
      return bitfield;
    }
    throw new Error(`Invalid bitfield: ${bitfield}`);
  };
};