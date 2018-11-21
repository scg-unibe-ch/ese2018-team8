import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';


@Injectable()
export class AuthenticationService {

  baseUrl;
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAdminSubject = new BehaviorSubject<boolean>(this.userIsAdmin());
  user = new User( 0, '', '', '', false);

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
              console.log('role at login: ' + this.userIsAdmin());
              if (this.userIsAdmin()) {
                this.isAdminSubject.next(true);
              }
              return user;
          }
        }));


  }


  userIsAdmin() {
    let userIsAdmin;
    if (this.hasToken()) {
      userIsAdmin = this.httpClient.get(this.baseUrl + '/auth/me', JSON.parse(sessionStorage.getItem('currentUser')).token)
          .pipe(map(data => {
            console.log(data['role']);
            if (data['role'] === 'admin') {
              return true;
            } else {
              return false;
            }
          }));
    }
    return userIsAdmin;
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
