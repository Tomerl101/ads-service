import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpError from '../errors/httpError';

function validateMiddleware(
  type: any,
  value: string | 'body' | 'query' | 'params' = 'query',
  skipMissingProperties = false
): RequestHandler {
  return (req: any, res, next) => {
    req[value].os = req.useragent.os;
    req[value].browser = req.useragent.browser;
    console.log(req[value]);
    validate(plainToClass(type, req[value]), { skipMissingProperties }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const errorMessage = errors
          .map((error: ValidationError) => Object.values(error.constraints!))
          .join(', ');

        next(new HttpError(400, errorMessage));
      } else {
        next();
      }
    });
  };
}

export default validateMiddleware;
