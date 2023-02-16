import { ActionManager } from "../../Action.js";

/**
 * "GUILD_CREATE" event.
 * @extends ActionManager
 */
export default class GuildAdd extends ActionManager {
  constructor(client) {
    super(client);
  };

  execute(data) {
    const guild = this.client.guilds._add(data);

    this.send(guild);
  };
};