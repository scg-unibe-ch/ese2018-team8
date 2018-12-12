import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthenticationService} from '../login/login.authservice';

/**
 * Error interceptor is the first component getting server responses. It then
 * creates messages according to error handling in request or in response respectively,
 * depending where messages are defined.
 **/

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        location.reload(true);
      } else {
        console.log(err.error.message || err.statusText);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
