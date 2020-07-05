import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { Constant } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class InterceptRequestsService {
  constructor(private router: Router) {}

  // intercept request and add headers
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone();

    if (!request.headers.get('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (!request.headers.get('Authorization')) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${Constant.AUTH.getToken()}` },
      });
    }

    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            if (!Constant.PRODUCTION && Constant.DEBUG) {
              console.log(
                `%cSTART HttpRequest :: Method => ${request.method} :: URL => ${request.url} :: `,
                'color: green;'
              );
              console.log(`%cHttpResponse`, 'color: green;', event);
              console.log(
                `%cEND HttpRequest :: Method => ${request.method} :: URL => ${request.url} :: `,
                'color: green;'
              );
            }
          }
        },
        (error) => {
          if (!Constant.PRODUCTION && Constant.DEBUG) {
            console.log(
              `%cSTART HttpRequest :: Method => ${request.method} :: URL => ${request.url} :: `,
              'color: red;'
            );
            console.error(`%cHttpResponse`, 'color: red;', error);
            console.log(
              `%cEND HttpRequest :: Method => ${request.method} :: URL => ${request.url} :: `,
              'color: red;'
            );
          }
          if (error.status === 401) {
            localStorage.setItem(
              Constant.AUTH.KEYS.urlBeforExpelling,
              this.router.url
            );
            localStorage.removeItem(Constant.AUTH.KEYS.token);
            this.router.navigateByUrl('');
          }
        }
      )
    );
  }
}
