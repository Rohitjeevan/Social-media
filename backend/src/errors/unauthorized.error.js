import { UnauthorizedErrorType } from '../libs/errorTypes.js';
import BaseError from './base.error.js';

export class UnauthorizedError extends BaseError {
  constructor() {
    super(UnauthorizedErrorType);
  }
}
