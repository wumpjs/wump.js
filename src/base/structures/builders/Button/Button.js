import { s } from "@sapphire/shapeshift";
import { BaseBuilder } from "../BaseBuilder.js";

import ButtonObject from "./ButtonObject.js";

/**
 * Button Builder
 * @extends BaseBuilder
 * @external
 * @see {@link https://discord.com/developers/docs/interactions/message-components#button-object}
 */
export class Button extends BaseBuilder {
  /**
   * @param {?ButtonObject} data 
   * @constructor
   */
  constructor(data) {
    super(data);
  };

  /**
   * Set type of button.
   * @param {number} type 
   * @returns {this}
   * @protected
   */
  setType(type) {
    s.number.parse(type);

    this.data.type = type;

    return this;
  };

  /**
   * Set style of button.
   * @param {string} style 
   * @returns {this}
   */
  setStyle(style) {
    s.string.parse(style);

    this.data.style = style;

    return this;
  };

  /**
   * Set label of button.
   * @param {string} label 
   * @returns {this}
   */
  setLabel(label) {
    s.string.parse(label);

    this.data.label = label;

    return this;
  };

  /**
   * Set emoji of button.
   * @param {EmojiObject} options 
   * @returns {this}
   */
  setEmoji(options) {
    if (typeof options !== "object") throw new Error(`'${options}' is not a valid Object.`);

    this.data.emoji = options;

    return this;
  };

  /**
   * Set custom id of button.
   * @param {string} id 
   * @returns {this}
   */
  setID(id) {
    s.string.parse(id);

    this.data.custom_id = (id ?? this.data?.customId);

    return this;
  };

  /**
   * Set URL of button.
   * @param {string} url 
   * @returns {this}
   */
  setURL(url) {
    s.string.parse(id);

    this.data.url = url;

    return this;
  };

  /**
   * Set state of button.
   * @param {boolean} state 
   * @returns {this}
   */
  setDisabled(state = true) {
    s.boolean.parse(state);

    this.data.enabled = state;

    return this;
  };

  /**
   * Converts Button to readable object.
   * @returns {?ButtonObject}
   */
  toJSON() {
    return this.data;
  };

  /**
   * Creates a new Button from JSON data.
   * @param {Button} button
   * @returns {Button}
   * @static
   */
  static direct(button) {
    let data;

    if (button?.toJSON) data = new this(button.toJSON());
    else data = new this(button);

    return data;
  };
};