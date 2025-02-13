import { RequestInputValidationErrorType } from '../libs/errorTypes.js';
import BaseError from './base.error.js';

export class RequestInputValidationError extends BaseError {
  constructor(fields = {}) {
    super(RequestInputValidationErrorType);
    this.fields = fields;
  }
}
