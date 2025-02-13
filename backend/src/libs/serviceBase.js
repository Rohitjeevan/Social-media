import _ from "lodash";

class ServiceBase {
  #_args = {};
  #_context = {};
  #_errors = {};
  #_successful = null;
  #_failed = null;
  #_result = null;

  constructor() {
    this.#_args = arguments[0];
    this.#_context = arguments[1];
    this.#_errors = {};
    this.#_successful = null;
    this.#_failed = null;
    this.#_result = null;
  }

  get context() {
    return this.#_context;
  }

  get args() {
    return this.#_args;
  }

  get errors() {
    return this.#_errors;
  }

  get result() {
    return this.#_result;
  }

  get failed() {
    return this.#_failed;
  }

  get successful() {
    return this.#_successful;
  }

  addError(attribute, errorMessage) {
    if (attribute !== _.startCase(_.camelCase(attribute)).replace(/ /g, "")) {
      throw new Error(`${attribute} should be pascal cased in addError()`);
    }
    const errors = (this.#_errors[this.constructor.name] =
      this.#_errors[this.constructor.name] || {});

    if (!errors[attribute]) {
      _.extend(errors, {
        [attribute]: `${_.startCase(attribute)} ${errorMessage || ""}`,
      });
    } else {
      errors[attribute] = Array.isArray(errors[attribute])
        ? errors[attribute]
        : [errors[attribute]];
      errors[attribute].push(`${_.startCase(attribute)} ${errorMessage}`);
    }
  }

  async #tryExecuting() {

    if(_.size(this.errors)){
      this.#_failed = true;
      this.#_successful = false;
      return;
    }

    try {
      this.#_result = await this.run();
    } catch (error) {

      throw error;
    }

    this.#_successful = !_.size(this.errors);
    this.#_failed = !!_.size(this.errors);
  }

  mergeErrors(errors){
    _.defaults(this.#_errors,errors);
  }

  static async execute() {
    const args = arguments;
    const instance = new this(...args);
    await instance.#tryExecuting();
    return instance;
  }
}

export { ServiceBase };
