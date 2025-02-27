import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import { InternalServerErrorType } from '../../libs/errorTypes.js';
import { getLocalizedError, isTrustedError } from '../../utills/error.utils.js';

/**
 *
 * @memberof Rest Middleware
 * @export
 * @name errorHandlerMiddleware
 * @param {*} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function errorHandlerMiddleware(err, req, res, next) {
 
  let errorsAreTrusted = true;
  let responseStatusCode;
  const responseErrors = [];
  if (!Array.isArray(err)) {
    err = [err];
  }
   console.log(err)
  const localizedInternalServerErrorType = getLocalizedError(InternalServerErrorType, res.__);
  
  if (Array.isArray(err) && !_.isEmpty(err)) {
    err.forEach(error => {
      if (!isTrustedError(error)) {
        errorsAreTrusted = false;

        if (!error.errorCode || error.errorCode === 3002) {
          req?.context?.logger.error(`${error.name} in ${req.path}`, {
            message: error.message || error.description,
            context: {
              traceId: req?.context?.traceId,
              query: req.query,
              params: req.params,
              body: req.body,
            },
            fault: error.fields,
          });
        }
      } else {
        req?.context?.logger.debug(`${error.name || InternalServerErrorType.name} in ${req.path}`, {
          message: error.message || error.description,
          context: {
            traceId: req?.context?.traceId,
            query: req.query,
            params: req.params,
            body: req.body,
          },
          fault: error.fields,
        });
      }

      responseStatusCode = error.statusCode;

      const localizedError = getLocalizedError(error, res.__);

      responseErrors.push(localizedError);
    });
  } else {
    req?.context?.logger.error(err.name || `${InternalServerErrorType.name}In ${req.path}`, {
      message: 'Empty errors array passed',
      context: { traceId: req?.context?.traceId },
    });
  }

  if (errorsAreTrusted) {
    res.status(responseStatusCode || StatusCodes.BAD_REQUEST).send({ data: {}, errors: responseErrors });
  } else {
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      data: {},
      errors: [
        {
          traceId: req?.context?.traceId,
          ...localizedInternalServerErrorType,
        },
      ],
    });
  }
  next();
}
