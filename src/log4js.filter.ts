import { ExceptionFilter, Catch, ArgumentsHost, Inject, HttpException } from '@nestjs/common';
import { LOG4JS_ERROR_LOGGER } from './log4js.constant';
import { Logger } from 'log4js';

@Catch(HttpException)
export class Log4jsFilter implements ExceptionFilter {
  constructor(
    @Inject(LOG4JS_ERROR_LOGGER) private errorLogger: Logger,
  ) {
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    this.errorLogger.error(exception, request, response);
    response.status(exception.getStatus()).json(exception.getResponse());
  }
}