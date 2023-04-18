class KiwiEmitter {
  constructor() {
    /**
     * @protected
     */
    this.events = {};
  };

  /**
   * @param {string} name 
   * @param {Function} callback 
   */
  on(name, callback) {
    if (!this.events[ name ]) this.events[ name ] = [];
    this.events[ name ].push(callback);
  };

  emit(name, ...args) {
    const listeners = this.events[ name ];
    if (!listeners) return;

    for (let index = 0; index < listeners.length; index++) {
      const listener = listeners[ index ];
      if (!listener) break;

      listener(...args);
    };
  };

  off(name, listener) {
    const listeners = this.events[ name ];
    if (!listeners) return;

    for (let index = 0; index < listeners.length; index++) {
      const index = listeners.indexOf(listener);
      if (index !== -1) listeners.splice(index, 1);
    };
  };
};

const emitter = new KiwiEmitter();
emitter.on("ready", (a) => console.log(a));
emitter.emit("ready", 0, 1, 2, 3, 4, 5, 6);