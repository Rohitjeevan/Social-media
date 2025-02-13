import { StatusCodes } from "http-status-codes";
import  BaseError  from "./base.error.js";


export class NotFoundError extends BaseError{
    constructor(resourceName){
        super({
            name:'NotFoundError',
            statusCode : StatusCodes.NOT_FOUND,
            isOperational: true,
            description : `${resourceName} not Found!`,
            errorCode : 3008
        })
    }
}