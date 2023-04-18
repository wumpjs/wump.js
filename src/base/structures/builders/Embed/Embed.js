import { s } from "@sapphire/shapeshift";
import { BaseBuilder } from "../BaseBuilder.js";

import ColorObject from "./ColorObject.js";

/**
 * Embed Builder
 * @extends BaseBuilder
 * @external
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object}
 */
export class Embed extends BaseBuilder {
  /**
   * @param {(embed: Embed) => Embed} data 
   * @constructor
   */
  constructor(data) {
    super(data);

    this.setType("rich");
  };

  /**
   * Set title of Embed.
   * @param {string} title 
   * @returns {this}
   */
  setTitle(title) {
    s.string.parse(title);

    this.define({ title });

    return this;
  };

  /**
   * Set description of Embed.
   * @param {string} content
   * @returns {this}
   */
  setDescription(content) {
    content = String(content);

    if (content.length < 1) throw new RangeError(`Embed 'description' is must be bigger than '0'.`);
    if (content.length > 4096) throw new RangeError(`Embed 'description' is bigger than '4096'.`);

    this.define({ description: content });

    return this;
  };

  /**
   * Set title url of Embed.
   * @param {string} url
   * @returns {this}
   */
  setURL(url) {
    s.string.parse(url);

    this.define({ url });

    return this;
  };

  /**
   * Set footer timestamp of Embed.
   * @param {number} time 
   * @returns {this}
   */
  setTimestamp(time = Date.now()) {
    s.number.parse(time);

    this.define({ timestamp: time });

    return this;
  };

  /**
   * Set color of Embed.
   * @param {string} color 
   * @returns {this}
   */
  setColor(color) {
    s.string.parse(color);

    if (!ColorObject?.[color]) throw new ReferenceError(`'${color}' is not a valid embed color.`);

    this.define({ color: ColorObject[color] });

    return this;
  };

  /**
   * Set footer of Embed.
   * @param {import("./Options").FooterObject} options 
   * @returns {this}
   */
  setFooter(options) {
    if (typeof options !== "object") throw new Error(`'${options}' is not a valid Object.`);

    this.define({
      footer: {
        icon_url: options?.iconURL,
        proxy_icon_url: options?.proxyIconURL,
        text: options?.text
      }
    });

    return this;
  };

  /**
   * Set image of Embed.
   * @param {import("./Options").ImageObject} options 
   * @returns {this}
   */
  setImage(options) {
    if (typeof options !== "object") throw new Error(`'${options}' is not a valid Object.`);

    this.define({
      image: {
        url: options?.url,
        height: options?.height,
        proxy_url: options?.proxyURL,
        width: options?.width
      }
    });

    return this;
  };

  /**
   * Set thumbnail of Embed.
   * @param {import("./Options").ThumbnailObject} options 
   * @returns {this}
   */
  setThumbnail(options) {
    if (typeof options !== "object") throw new Error(`'${options}' is not a valid Object.`);

    this.define({
      thumbnail: {
        url: options?.url,
        height: options?.height,
        proxy_url: options?.proxyURL,
        width: options?.width
      }
    });

    return this;
  };

  /**
   * Set video of Embed.
   * @param {import("./Options").VideoObject} options 
   * @returns {this}
   * @private
   */
  setVideo(options) {
    if (typeof options !== "object") throw new Error(`'${options}' is not a valid Object.`);

    this.define({
      video: {
        url: options?.url,
        height: options?.height,
        proxy_url: options?.proxyURL,
        width: options?.width
      }
    });

    return this;
  };

  /**
   * Set provider of Embed.
   * @param {import("./Options").ProviderObject} options 
   * @returns {this}
   * @private
   */
  setProvider(options) {
    if (typeof options !== "object") throw new Error(`'${options}' is not a valid Object.`);

    this.define({ provider: options });

    return this;
  };

  /**
   * Set author of Embed.
   * @param {import("./Options").AuthorObject} options 
   * @returns {this}
   */
  setAuthor(options) {
    if (typeof options !== "object") throw new Error(`'${options}' is not a valid Object.`);

    this.define({
      author: {
        name: options?.name,
        icon_url: options?.iconURL,
        proxy_icon_url: options?.proxyIconURL,
        url: options?.url
      }
    });

    return this;
  };

  /**
   * Set fields of Embed.
   * @param {...(import("./Options").FieldObject)} fields 
   * @returns {this}
   */
  setFields(...fields) {
    if (!Array.isArray(fields)) throw new TypeError(`'${fields}' is not Array.`);

    const queue = this.query(fields, (setMax, field, index) => {
      setMax(index, 25);

      return {
        name: String(field?.name),
        value: String(field?.value),
        inline: field?.inline ?? false
      };
    });

    this.define({ fields: queue });

    return this;
  };

  /**
   * Add fields to Embed.
   * @param {...(import("./Options").FieldObject)} fields
   * @returns {this}
   */
  addFields(...fields) {
    if (!Array.isArray(fields)) throw new TypeError(`'${fields}' is not Array.`);

    const data = this.toJSON();
    if (data?.fields?.length > 25) throw new RangeError("DataLimitExceeded", `Maximum embed size is '25'`);

    const queue = this.query(fields, (setMax, field, index) => {
      setMax(index, 25);

      return {
        name: String(field?.name),
        value: String(field?.value),
        inline: field?.inline ?? false
      };
    });

    this.define({ fields: queue, overWrite: true });

    return this;
  };

  /**
   * Add field to Embed.
   * @param {string} name
   * @param {any} value
   * @param {boolean} inline
   * @returns {this}
   */
  addField(name, value, inline = false) {
    s.boolean.parse(inline);

    const data = this.toJSON();
    if (data?.fields?.length > 25) throw new RangeError("DataLimitExceeded", `Maximum embed size is '25'`);

    name = String(name);
    value = String(value);

    this.define({ fields: { name, value, inline }, overWrite: true });

    return this;
  };
};