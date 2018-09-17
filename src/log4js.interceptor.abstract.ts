import { NestInterceptor, ExecutionContext } from '@nestjs/common';
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
    call$: Observable<any>,
  ): Observable<any> {
    const httpRequest = context.switchToHttp().getRequest();
    this.requestLogger.info(this.requestFormat(httpRequest));
    return call$.pipe(
      tap(httpResponse => {
        this.responseLogger.info(this.responseFormat(httpResponse));
      }),
    );
  }

  abstract requestFormat<T>(httpRequest: T): string;

  abstract responseFormat<T>(httpResponse: T): string;
}