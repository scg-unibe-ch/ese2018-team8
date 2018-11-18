import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';


@Injectable()
export class AuthenticationService {

  baseUrl;
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  login(username: string, password: string) {
    this.httpClient.get(this.baseUrl, { withCredentials: true });

    return this.httpClient.post<any>(this.baseUrl + '/auth/login', {email: username, password: password})
          .pipe(map( user => {
          // login successful if there's a jwt token in the response
            if (user.auth && user.token) {
            // store user details and jwt token in session storage to keep user logged in between page refreshes
              sessionStorage.setItem('currentUser', JSON.stringify(user));
              // send the next status to subscribers
              this.isLoginSubject.next(true);
              return user;
          }
        }));


  }

  logout() {
    // remove user from session storage to log user out
    sessionStorage.removeItem('currentUser');
    this.isLoginSubject.next(false);
  }

  // if there's a token, user is logged in
  private hasToken() {
    return !!sessionStorage.getItem('currentUser');
  }

  /**
   * return isLoginSubject as Observable
   */
  isLoggedIn() {
    return this.isLoginSubject.asObservable();

    // share() is needed in order to prevent async pipes from creating
    //    * multiple subscriptions.
    //     return this.isLoginSubject.asObservable().share();
  }
}
