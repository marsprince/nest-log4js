import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from 'log4js';

export abstract class Log4jsInterceptorAbstract implements NestInterceptor {
  protected constructor(
    protected requestLogger: Logger,
    protected responseLogger: Logger,
  ) {
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const httpRequest = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(httpResponse => {
        this.requestLogger.info(this.requestFormat(httpRequest));
        this.responseLogger.info(this.responseFormat(httpResponse));
      }),
    );
  }

  abstract requestFormat<T>(httpRequest: T): string;

  abstract responseFormat<T>(httpResponse: T): string;
}