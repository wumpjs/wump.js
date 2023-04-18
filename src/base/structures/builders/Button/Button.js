import { s } from "@sapphire/shapeshift";
import { BaseBuilder } from "../BaseBuilder.js";

/**
 * Button Builder
 * @extends BaseBuilder
 * @external
 * @see {@link https://discord.com/developers/docs/interactions/message-components#button-object Discord#MessageComponents.Buttons.ButtonObject}
 */
export class Button extends BaseBuilder {
  /**
   * @param {(button: Button) => void} data 
   * @constructor
   */
  constructor(data) {
    super(data);

    this.setType(2); 
  };

  /**
   * Set style of button.
   * @param {number | string | import("./Options").ButtonStyles} style 
   * @returns {this}
   */
  setStyle(style = 1) {
    if (typeof style === "string") {
      style = style.toLowerCase();

      if (style === "primary") style = 1;
      else if (style === "secondary") style = 2;
      else if (style === "success") style = 3;
      else if (style === "danger") style = 4;
      else if (style === "link") style = 5;
    };

    this.define({ style });

    return this;
  };

  /**
   * Set label of button.
   * @param {string} label 
   * @returns {this}
   */
  setLabel(label) {
    s.string.parse(label);

    this.define({ label });

    return this;
  };

  /**
   * Set emoji of button.
   * @param {import("./Options").EmojiObject} options 
   * @returns {this}
   */
  setEmoji(options) {
    if (typeof options !== "object") throw new Error(`'${options}' is not a valid Object.`);

    this.define({ emoji: options });

    return this;
  };

  /**
   * Set custom id of button.
   * @param {string} id 
   * @returns {this}
   */
  setID(id) {
    s.string.parse(id);

    const data = this.toJSON();
    if (data?.url) throw new Error("InvalidUsage", `You are cannot use URL with Custom ID.`);

    this.define({ custom_id: id });

    return this;
  };

  /**
   * Set URL of button.
   * @param {string} url 
   * @returns {this}
   */
  setURL(url) {
    s.string.parse(url);

    const data = this.toJSON();
    if (data?.custom_id) throw new Error("InvalidUsage", `You are cannot use Custom ID with URL.`);

    this.define({ url });

    return this;
  };

  /**
   * Set the button to be on or off.
   * @param {boolean} state 
   * @returns {this}
   */
  setDisabled(state = true) {
    s.boolean.parse(state);

    this.define({ disabled: state });

    return this;
  };

  /**
   * Set the button to be on or off.
   * @param {boolean} state 
   * @returns {this}
   */
  setEnabled(state = true) {
    s.boolean.parse(state);

    this.define({ disabled: state ? false : state });

    return this;
  };
};
