import { s } from "@sapphire/shapeshift";
import { BaseBuilder } from "../BaseBuilder.js";

import ColorObject from "./ColorObject.js";
import EmbedObject, { AuthorObject, FieldObject, FooterObject, ProviderObject, ImageObject, VideoObject, ThumbnailObject } from "./EmbedObject.js";

/**
 * Embed Builder
 * @extends BaseBuilder
 * @external
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object}
 */
export class Embed extends BaseBuilder {
  /**
   * @param {?EmbedObject} data 
   * @constructor
   */
  constructor(data) {
    super(data);
  };

  /**
   * Set title of embed.
   * @param {string} title 
   * @returns {this}
   */
  setTitle(title) {
    s.string.parse(title);

    this.data.title = title;

    return this;
  };

  /**
   * Set type of embed.
   * @param {string} type 
   * @returns {this}
   * @protected
   */
  setType(type) {
    s.string.parse(type);

    this.data.type = type;

    return this;
  };

  /**
   * Set description of embed.
   * @param {string} content
   * @returns {this}
   */
  setDescription(content) {
    s.string.parse(content);

    if (content.length > 4095) throw new RangeError(`Embed 'description' is bigger than '4095'.`);

    this.data.description = content;

    return this;
  };

  /**
   * Set title url of embed.
   * @param {string} target
   * @returns {this}
   */
  setURL(target) {
    s.string.parse(target);

    this.data.url = target;

    return this;
  };

  /**
   * Set footer timestamp of embed.
   * @param {number} time 
   * @returns {this}
   */
  setTimestamp(time = Date.now()) {
    s.number.parse(time);

    this.data.timestamp = time;

    return this;
  };

  /**
   * Set color of embed.
   * @param {string} color 
   * @returns {this}
   */
  setColor(color) {
    s.string.parse(color);

    if (!ColorObject?.[ color ]) throw new ReferenceError(`'${color}' is not a valid embed color.`);

    this.data.color = ColorObject[ color ];

    return this;
  };

  /**
   * Set footer of embed.
   * @param {FooterObject} options 
   * @returns {this}
   */
  setFooter(options) {
    if (typeof options !== "object") throw new Error(`'${options}' is not a valid Object.`);

    this.data.footer = options;

    return this;
  };

  /**
   * Set image of embed.
   * @param {ImageObject} options 
   * @returns {this}
   */
  setImage(options) {
    if (typeof options !== "object") throw new Error(`'${options}' is not a valid Object.`);

    this.data.image = options;

    return this;
  };

  /**
   * Set thumbnail of embed.
   * @param {ThumbnailObject} options 
   * @returns {this}
   */
  setThumbnail(options) {
    if (typeof options !== "object") throw new Error(`'${options}' is not a valid Object.`);

    this.data.thumbnail = options;

    return this;
  };

  /**
   * Set video of embed.
   * @param {VideoObject} options 
   * @returns {this}
   * @protected
   */
  setVideo(options) {
    if (typeof options !== "object") throw new Error(`'${options}' is not a valid Object.`);

    this.data.video = options;

    return this;
  };

  /**
   * Set provider of embed.
   * @param {ProviderObject} options 
   * @returns {this}
   * @protected
   */
  setProvider(options) {
    if (typeof options !== "object") throw new Error(`'${options}' is not a valid Object.`);

    this.data.provider = options;

    return this;
  };

  /**
   * Set author of embed.
   * @param {AuthorObject} options 
   * @returns {this}
   */
  setAuthor(options) {
    if (typeof options !== "object") throw new Error(`'${options}' is not a valid Object.`);

    this.data.author = options;

    return this;
  };

  /**
   * Set fields of embed.
   * @param {FieldObject[]} fields 
   * @returns {this}
   */
  setFields(fields = this.data?.fields) {
    if (!Array.isArray(fields)) throw new TypeError(`'${fields}' is not Array.`);

    let size = 0;
    const queue = [];

    for (let index = 0; index < fields.length; index++) {
      if (size > 25) break;

      const field = fields[ index ];
      queue.push({ name: String(field?.name), value: String(field?.value), inline: field?.inline ?? false });

      size++;
    };

    if (this.data?.fields) for (let index = 0; index < queue.length; index++) this.data?.fields.push(queue[ index ]);
    else this.data.fields = queue;

    return this;
  };

  /**
   * Converts Embed to readable object.
   * @returns {?EmbedObject}
   */
  toJSON() {
    return this.data;
  };

  /**
   * Creates a new Embed from JSON data.
   * @param {Embed} embed 
   * @returns {Embed}
   * @static
   */
  static direct(embed) {
    let data;

    if (embed?.toJSON) data = new this(embed.toJSON());
    else data = new this(embed);

    return data;
  };
};