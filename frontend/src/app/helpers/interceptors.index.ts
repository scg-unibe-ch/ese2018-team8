/** "Barrel" of Http Interceptors
  With interception, you declare interceptors that inspect and transform HTTP requests
  from your application to the server (jwt interceptor). The same interceptors may also inspect and transform
  the server's responses on their way back to the application (error interceptor).
**/

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorInterceptor} from './error.interceptor';
import {JwtInterceptor} from './jwt.interceptor';

// Http interceptor providers

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
];
