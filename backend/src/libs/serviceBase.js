import _ from 'lodash';
import { Logger } from './logger';

/**
 *
 *
 * @class ServiceBase
 *
 * @classdesc Service Base class for creating services for business logic
 * and perform some task and log them properly
 *
 * @hideconstructor
 */
class ServiceBase {
  #_args = {};
  #_context = {};
  #_errors = {};
  #_successful = null;
  #_failed = null;
  #_result = null;

  constructor() {
    // biome-ignore lint: TODO
    this.#_args = arguments[0];
    // biome-ignore lint: TODO
    this.#_context = arguments[1];
    this.#_errors = {};
    this.#_successful = null;
    this.#_failed = null;
    this.#_result = null;
    this.#validateServiceInputs();
  }

  /**
   * @typedef { Object } Context
   * @property { import('express').Request } req
   * @property { Date } reqTimeStamp
   * @property { string } traceId
   * @property { import('../db/models').sequelize } sequelize
   * @property { Object<string, import('sequelize').ModelStatic<import('sequelize').Model>> } dbModels
   * @property { Logger } logger
   * @property { import('@socket.io/redis-emitter').Emitter } socketEmitter
   * @property { import('sequelize').Transaction } [trx]
   */

  /**
   *
   * @readonly
   * @memberof ServiceBase
   * @description For reading the context of the service object
   * @returns { Context }
   */
  get context() {
    return this.#_context;
  }

  /**
   *
   *
   * @readonly
   * @memberof ServiceBase
   */
  get args() {
    return this.#_args;
  }

  /**
   *
   *
   * @readonly
   */
  get result() {
    return this.#_result;
  }

  /**
   *
   *
   * @readonly
   */
  get failed() {
    return this.#_failed;
  }

  /**
   *
   *
   * @readonly
   */
  get errors() {
    return this.#_errors;
  }

  /**
   *
   *
   * @readonly
   */
  get successful() {
    return this.#_successful;
  }

  /**
   *
   *
   * @readonly
   */
  get log() {
    return {
      info: (logTitle, argHash = {}) => {
        argHash.klass = this.constructor;
        Logger.info(logTitle, argHash);
      },
      debug: (logTitle, argHash = {}) => {
        argHash.klass = this.constructor;
        Logger.debug(logTitle, argHash);
      },
      error: (logTitle, argHash = {}) => {
        argHash.klass = this.constructor;
        Logger.error(logTitle, argHash);
      },
    };
  }

  /**
   *
   * @private
   * @function
   * @async
   */
  async #tryExecuting() {
    if (_.size(this.errors)) {
      this.#_failed = true;
      this.#_successful = false;
      return;
    }
    try {
      this.#_result = await this.run();
    } catch (error) {
      if (!error.isOperational) {
        Logger.error('Error in Service', {
          klass: this.constructor,
          message: error.message,
          context: {
            data: { ...this.args },
            traceId: this.context.traceId,
            authId: this.context.authUser?.id,
          },
          exception: error,
        });
      }

      throw error;
    }
    this.#_successful = !_.size(this.errors);
    this.#_failed = !!_.size(this.errors);
  }

  /**
   *
   *
   * @param {string} attribute
   * @param {*} errorMessage
   * @return {undefined}
   */
  addError(attribute, errorMessage) {
    // check if attribute is in pascal case
    if (attribute !== _.startCase(_.camelCase(attribute)).replace(/ /g, ''))
      throw new Error(`${attribute} should be pascal cased in addError()`);

    // biome-ignore lint: TODO
    const errors = (this.#_errors[this.constructor.name] = this.#_errors[this.constructor.name] || {});

    if (!errors[attribute]) {
      _.extend(errors, {
        [attribute]: `${_.startCase(attribute)} ${errorMessage || ''}`,
      });
    } else {
      errors[attribute] = Array.isArray(errors[attribute]) ? errors[attribute] : [errors[attribute]];
      errors[attribute].push(`${_.startCase(attribute)} ${errorMessage}`);
    }

    // Logger.debug('Custom Validation Failed', {
    //   klass: this.constructor,
    //   message: errorMessage,
    //   context: { attribute },
    //   userCtx: this.context,
    //   fault: this.errors,
    // });
  }

  /**
   *
   *
   * @instance
   * @param {any[]} errors
   */
  mergeErrors(errors) {
    _.defaults(this.#_errors, errors);
  }

  /**
   *
   * @instance
   * @private
   * @async
   */
  async #validateServiceInputs() {
    const schema = this.constraints;
    if (schema) {
      const valid = schema(this.#_args);
      if (!valid) {
        const validationErrors = schema.errors;
        const errors = validationErrors.map(error => error.message);
        _.extend(this.errors, { [this.constructor.name]: errors });
        Logger.debug('Service input Validation Failed', {
          klass: this.constructor,
          message: 'Validation Failed',
          context: this.args,
          userCtx: this.context,
          fault: this.errors,
        });
      }
    }
  }

  // Static methods

  /**
   *
   * @static
   * @async
   */
  static async run() {
    Logger.info(`Service Started: ${ServiceBase.name}`, {
      context: ServiceBase.args,
      userCtx: ServiceBase.context,
      wrap: 'start',
    });
    // biome-ignore lint/style/noArguments: TODO
    const args = arguments;
    const instance = new ServiceBase(...args);
    await instance.#tryExecuting();
    if (_.size(instance.errors)) throw instance.errors;
    Logger.info(`Service Finished: ${ServiceBase.name}`, {
      context: ServiceBase.args,
      userCtx: ServiceBase.context,
      wrap: 'end',
    });
    return instance.result;
  }

  /**
   *
   * @static
   * @async
   */
  static async execute() {
    // biome-ignore lint: TODO
    Logger.info(`Service Started: ${this.name}`, {
      // biome-ignore lint: TODO
      context: this.args, // biome-ignore lint: TODO
      userCtx: this.context,
      wrap: 'start',
    });
    // biome-ignore lint/style/noArguments: TODO
    const args = arguments;
    // biome-ignore lint: TODO
    const instance = new this(...args);
    await instance.#tryExecuting(); // biome-ignore lint: TODO
    Logger.info(`Service Finished: ${this.name}`, {
      // biome-ignore lint: TODO
      context: this.args, // biome-ignore lint: TODO
      userCtx: this.context,
      wrap: 'end',
    });
    return instance;
  }
}

export { ServiceBase };
