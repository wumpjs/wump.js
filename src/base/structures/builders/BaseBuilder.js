import { s } from "@sapphire/shapeshift";

/**
 * BaseBuilder for Buttons, Rows, Embeds...
 * @abstract
 */
export class BaseBuilder {
  /**
   * @param {(builder: BaseBuilder) => void} data 
   * @constructor
   */
  constructor(data) {

    if (typeof data === "function") data(this);

    /**
     * Builder data.
     * @readonly
     */
    this.data = {};
  };

  /**
   * Set builder type.
   * @param {number | string} type 
   * @returns {null | 0}
   * @protected
   */
  setType(type) {
    if (typeof type !== "number" && typeof type !== "string") return null;

    this.define({ type });

    return 0;
  };

  /**
   * @param {{ overWrite?: boolean }[]} properties
   * @returns {{ name: string, value: any }[]}
   * @protected
   */
  define(...properties) {
    if (!Array.isArray(properties)) throw new TypeError("InvalidType", `'${properties}' is not Array.`);

    const array = [];
    for (let index = 0; index < properties.length; index++) {
      const property = properties[index];
      const keys = Object.keys(property);

      for (let i = 0; i < keys.length; i++) {
        const name = keys[i];
        if (name === "overWrite") break;

        const data = this.data[name];
        const value = property[name];

        const overWrite = (property?.overWrite ?? false);
        s.boolean.parse(overWrite);

        if (Array.isArray(data)) {
          if (Array.isArray(value)) this.data[name].push(...value);
          else this.data[name].push(...[value]);

          array.push({ name, value });

          break;
        };

        if (overWrite && data) {
          this.data[name] = {
            ...[data],
            value
          };

          array.push({ name, value });

          break;
        };

        this.data[name] = value;

        array.push({ name, value });
      };
    };

    return array;
  };

  /**
   * @param {Array} args 
   * @param {(setMax: (index: number, max: number) => void, value: any, index: number) => any} callback
   * @returns {any[]}
   * @protected
   */
  query(args, callback) {
    const array = [];

    const setMax = (index, max) => {
      if (index > max) throw new RangeError("DataLimitExceeded", `Maximum data size is '${max}'`);

      return void 0;
    };

    for (let index = 0; index < args.length; index++) {
      const data = args[index];

      const handledData = callback(setMax, data, index);
      array.push(handledData);
    };

    return array;
  };

  /**
   * Converts Builder to readable object.
   * @returns {{}}
   */
  toJSON() {
    return this.data;
  };

  /**
   * Creates a new Builder from JSON data or Builder class.
   * @param {this} builder
   * @returns {this}
   * @static
   */
  static direct(builder) {
    return (builder?.toJSON ? new this(builder.toJSON()) : new this(builder));
  };

  static version = "v1.0.0";
};