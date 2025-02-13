import {parse,stringify}  from 'flatted';
import { StatusCodes } from 'http-status-codes';
import { ResponseValidationError } from '../../errors/responseValidation.error.js';
import { ajv } from '../../libs/ajv.js';

export function responseValidationMiddleware({ responseSchema = {} } = {}) {
    const compiledResponseSchema = {};
  
    if (responseSchema) {
      const httpCodes = Object.keys(responseSchema);
      for (const code of httpCodes) {
        const schema = responseSchema[code];
  
        compiledResponseSchema[code] = ajv.compile(schema);
      }
    }
  
    return (req, res, next) => {
      res.payload = { data: null, errors: [], ...res.payload };
      res.payload = parse(stringify(res.payload));
  
      const statusCode = res.statusCode || req?.context?.statusCode || StatusCodes.OK;
  
      const compiledSchema =
        compiledResponseSchema[statusCode] ||
        compiledResponseSchema[`${statusCode.toString()[0]}xx`] ||
        compiledResponseSchema.default;
  
      if (compiledSchema) {
        if (compiledSchema(res.payload?.data)) {
          res.status(statusCode).json({ ...res.payload });
        } else {
          const errors = ajv.errorsText(compiledSchema.errors, { separator: ' ||||| ' }).split(' ||||| ');
          const responseValidationError = new ResponseValidationError({ errors });
          next(responseValidationError);
        }
      } else {
        res.status(statusCode).json({ ...res.payload });
      }
    };
  }
  