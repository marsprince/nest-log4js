import { Injectable, NestInterceptor, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LOG4JS_REQUEST_LOGGER, LOG4JS_RESPONSE_LOGGER } from './log4js.constant';
import { Logger } from 'log4js';

@Injectable()
export class Log4jsInterceptor implements NestInterceptor {
  constructor(
    @Inject(LOG4JS_REQUEST_LOGGER) private requestLogger: Logger,
    @Inject(LOG4JS_RESPONSE_LOGGER) private responseLogger: Logger,
  ) {
  }

  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const httpRequest = context.switchToHttp().getRequest();
    this.requestLogger.info(httpRequest);
    return call$.pipe(
      tap(httpResponse => {
        this.responseLogger.info(httpResponse);
      }),
    );
  }
}