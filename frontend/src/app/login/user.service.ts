import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<User[]>(this.baseUrl + '/users')
        .pipe(
            tap( users => console.log('fetched users'))
        );
  }

  getById(id: number): Observable<User> {
    const url = `${this.baseUrl}/user/${id}`;
    return this.httpClient.get<User>(url)
        .pipe(
            tap( user => console.log(`fetched user ${id}`))
    );
  }

  register(user: User) {
    return this.httpClient.post(this.baseUrl + '/users/register', user);
  }

  update(user: User) {
    return this.httpClient.put(this.baseUrl + '/users' + user.id, user);
  }

  delete(id: number) {
    return this.httpClient.delete(this.baseUrl + '/users' + id);
  }
}
