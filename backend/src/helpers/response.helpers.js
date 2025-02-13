import _ from "lodash";
import { extractErrorAttributes } from "../utills/error.utils.js";
import * as errorTypes from '../libs/errorTypes.js';
import BaseError from "../errors/base.error.js";


export const sendResponse = ( { req, res, next },  { successful, result, serviceErrors, defaultError } ) => {
  if (successful && !_.isEmpty(result)) {
    res.payload = { data: result, errors: [] };
    next();
  } else {
    if (!_.isEmpty(serviceErrors)) {
      const responseErrors = extractErrorAttributes(serviceErrors).map( (errorAttr) => errorTypes[errorAttr] || errorAttr);
      return next(responseErrors);
    }
    const responseError = new BaseError({ ...defaultError });
    next(responseError);
  }
};
