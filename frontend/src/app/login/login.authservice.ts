import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';


@Injectable()
export class AuthenticationService {

  baseUrl;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  login(username: string, password: string) {
    return this.httpClient.post<any>(this.baseUrl + '/auth/login', {email: username, password: password})
          .pipe(map( user => {
          // login successful if there's a jwt token in the response
            console.log(user);
            if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              console.log(user);
              return user;
          }
        }));


  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
