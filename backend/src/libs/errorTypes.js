import { StatusCodes } from 'http-status-codes';

export const RequestInputValidationErrorType = {
  name: 'RequestInputValidationError',
  statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
  isOperational: true,
  description: 'Please check the request data',
  errorCode: 3001,
};

export const ResponseValidationErrorType = {
  name: 'ResponseInputValidationError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: false,
  description: 'Response validation failed please refer json schema of response',
  errorCode: 3002,
};

export const SocketRequestInputValidationErrorType = {
  name: 'SocketRequestInputValidationError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Please check the request data',
  errorCode: 3003,
};

export const SocketResponseValidationErrorType = {
  name: 'SocketResponseValidationError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: false,
  description: 'Response validation of socket failed please refer json schema of response',
  errorCode: 3004,
};

export const InternalServerErrorType = {
  name: 'InternalServerError',
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  isOperational: true,
  description: 'Internal Server Error',
  errorCode: 3005,
};

export const InvalidSocketArgumentErrorType = {
  name: 'InvalidSocketArgumentError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Please provide, proper arguments eventName, [payloadObject], and [callback]',
  errorCode: 3006,
};

export const UnauthorizedErrorType = {
  name: 'UnauthorizedError',
  statusCode: StatusCodes.UNAUTHORIZED,
  isOperational: true,
  description: 'You are not authorized!',
  errorCode: 3007,
};

// 3008 is used in <resource> not found error
// 3009 is used in  bad request error

export const InvalidCredentialErrorType = {
  name: 'InvalidCredentialError',
  statusCode: StatusCodes.UNAUTHORIZED,
  isOperational: true,
  description: 'Invalid credentials, please check credentials again',
  errorCode: 3010,
};

export const UsernameExistsErrorType = {
  name: 'UsernameExistsError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Username already exists',
  errorCode: 3011,
};

export const EmailExistsErrorType = {
  name: 'EmailExistsError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Email already exists',
  errorCode: 3012,
};

export const SamePasswordErrorType = {
  name: 'SamePasswordError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'New password cannot be same as one of previous passwords',
  errorCode: 3013,
};

export const CmsPageExistErrorType = {
  name: 'CmsPageExistError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'CMS Page already exists',
  errorCode: 3014,
};
