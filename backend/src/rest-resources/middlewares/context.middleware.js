import { nanoid } from 'nanoid';
import models, { sequelize } from '../../db/models';
import { Logger } from '../../libs/logger';
// import socketEmitter from '../../libs/socketEmitter';

const transactionStatuses = ['commit', 'rollback'];
const errorStatusCodes = ['4', '5'];

/**
 *
 * @export
 * @param {boolean} automaticTransaction to start the transaction or not
 *
 * @returns
 * @function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * It will create a context for each request the context will hold things like
 * traceId - id of the request
 * sequelize - sequelize database connection
 * dbModels - all sequelize models
 * logger - logger instance
 * socketEmitter - socket emitter for emitting data directly
 *
 * It will also start the transaction and at the end of the response it will commit it or rollback as per the data based on automaticTransaction
 */
export function contextMiddleware(automaticTransaction = false) {
  return async (req, res, next) => {
    const context = {
      req: req,
      reqTimeStamp: Date.now(),
      traceId: nanoid(),
      sequelize: sequelize,
      dbModels: models,
      logger: Logger,
      authUser: undefined,
    };

    if (automaticTransaction) {
      /** @type {import('sequelize').Transaction} */
      context.sequelizeTransaction = await sequelize.transaction();

      const onFinishAndClose = async () => {
        if (~transactionStatuses.indexOf(context.sequelizeTransaction.finished)) {
          return;
        }

        if (~errorStatusCodes.indexOf(res.statusCode.toString()[0]) || res.payload?.errors?.length || !res.payload) {
          await context.sequelizeTransaction.rollback();
          return;
        }

        await context.sequelizeTransaction.commit();
      };

      res.on('finish', onFinishAndClose);
      res.on('close', onFinishAndClose);
    }

    req.setAuthUser = user => {
      context.authUser = user;
    };

    req.context = context;

    next();
  };
}
