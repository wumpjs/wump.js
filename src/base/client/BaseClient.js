import EventEmitter from "node:events";

export class BaseClient extends EventEmitter {
  constructor() {
    super({ captureRejections: true });

    this.setMaxListeners(0);
  };
};