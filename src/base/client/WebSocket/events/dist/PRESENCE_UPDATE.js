import { ActionManager } from "../../Action.js";

/**
 * Discord "PRESENCE_UPDATE" event.
 * @extends ActionManager
 */
export default class PresenceUpdate extends ActionManager {
  constructor(client) {
    super(client);
  };

  execute(...data) {
    this.send(...data);
  };
};