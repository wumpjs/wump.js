import { ActionManager } from "../../Action.js";

/**
 * "GUILD_UPDATE" event.
 * @extends ActionManager
 */
export default class GuildUpdate extends ActionManager {
  constructor(client) {
    super(client);
  };

  execute(data) {
   // [DEPRECATED] this.client.emit(this.fetchAction().defaultName, true);
this.send(true)
    
  };
};