import { s } from "@sapphire/shapeshift";
import { BaseClient } from "./BaseClient.js";
/**
 * Webhook Builder
 * @extends BaseBuilder
 * @external
 * @see {@link https://discord.com/developers/docs/interactions/message-components#button-object}
 */
export class Webhook extends BaseClient {
  /**
   * @param {?WebhookObject} options
   * @constructor
   */
  constructor(options) {
    super();

    this.url = options.url;
  };

  send(content, { username, avatarURL, embeds = [] } = {}) {

    const data = {
      content,
      username,
      avatar_url: avatarURL,
      embeds,
    };

    // ok

  }

};