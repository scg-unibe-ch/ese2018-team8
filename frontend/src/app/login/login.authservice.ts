import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {Token} from '../models/token';

import * as jwt_decode from 'jwt-decode';


@Injectable()
export class AuthenticationService {

  baseUrl;
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAdminSubject = new BehaviorSubject<boolean>(this.userIsAdmin());
  token: Token = new Token(0, '', 0);

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
              if (this.userIsAdmin()) {
                this.isAdminSubject.next(true);
              }
              return user;
          }
        }));
  }

  // get verified Token
  getVerifiedToken(): any {
    if (this.hasToken()) {
      try {
        return jwt_decode(JSON.parse(sessionStorage.getItem('currentUser'))['token']);
      } catch (error) {
        return null;
      }
    } return null;
  }

  // get userRole from verified Token
  private userIsAdmin() {
    if (this.hasToken()) {
      console.log(this.hasToken());
      this.token = this.getVerifiedToken();
      if (this.token !== null && this.token.role === 'admin') {
        return true;
      }
    }
    return false;
  }

  logout() {
    // remove user from session storage to log user out
    sessionStorage.removeItem('currentUser');
    this.isLoginSubject.next(false);
    this.isAdminSubject.next(false);
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

  isAdmin() {
    return this.isAdminSubject.asObservable();
  }
}
