import { ResponseValidationErrorType } from '../libs/errorTypes.js';
import BaseError from './base.error.js';

export class ResponseValidationError extends BaseError {
  constructor(fields = {}) {
    super(ResponseValidationErrorType);
    this.fields = fields;
  }
}
