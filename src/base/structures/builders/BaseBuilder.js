import { s } from "@sapphire/shapeshift";

/**
 * BaseBuilder for Buttons, Rows, Embeds...
 * @abstract
 */
export class BaseBuilder {
  /**
   * @param {object} data 
   * @constructor
   */
  constructor(data) {
    /**
     * @private
     */
    this.data = data ?? {};
  };

  static version = "v1.0.0";
};