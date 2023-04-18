import { s } from "@sapphire/shapeshift";
import { BaseBuilder } from "../BaseBuilder.js";

/**
 * Row Builder
 * @extends BaseBuilder
 * @external
 * @see {@link https://discord.com/developers/docs/interactions/message-components#button-object Discord#MessageComponents.Buttons.ButtonObject}
 */
export class Row extends BaseBuilder {
  /**
   * @param {(row: Row) => void} data 
   * @constructor
   */
  constructor(data) {
    super(data);

    this.setType(1);
  };

  /**
   * Set components for message.
   * @param  {...any} components 
   * @returns {this}
   */
  setComponents(...components) {
    if (!Array.isArray(components)) throw new TypeError("InvalidType", `'components' must be Array.`);

    const array = [];
    for (let index = 0; index < components.length; index++) {
      const component = components[index];

      if (!component?.toJSON) {
        array.push(component);
        break;
      };

      array.push(component.toJSON());
    };

    this.define({ components: array });

    return this;
  };

  /**
   * Add components into Row.
   * @param  {...any} components 
   * @returns {this}
   */
  addComponents(...components) {
    if (!Array.isArray(components)) throw new TypeError("InvalidType", `'components' must be Array.`);

    const array = [];
    for (let index = 0; index < components.length; index++) {
      const component = components[index];

      if (!component?.toJSON) {
        array.push(component);
        break;
      };

      array.push(component.toJSON());
    };

    this.define({ components: array, overWrite: true });

    return this;
  };
};