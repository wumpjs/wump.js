import { ActionManager } from "../../Action.js";

/**
 * Discord "READY" event.
 * @extends ActionManager
 */
export default class Ready extends ActionManager {
  constructor(client) {
    super(client);
  };

  execute(data) {
    this.send(true);
  };
};