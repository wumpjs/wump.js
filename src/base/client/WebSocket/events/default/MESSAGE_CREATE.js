import { ActionManager } from "../../Action.js";

/**
 * Discord "MESSAGE_CREATE" event.
 * @extends ActionManager
 */
export default class Message extends ActionManager {
  constructor(client) {
    super(client);
  };

  execute(data) {
    this.send(data);
  };
};