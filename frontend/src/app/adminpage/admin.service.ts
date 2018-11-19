import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {JobListing} from '../models/joblisting';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getInValidatedJoblistings(): Observable<JobListing[]> {
    return this.http.get<JobListing[]>(this.baseUrl + '/joblisting')
      .pipe(
        tap(jobs => console.log('fetched jobs'))
      );
  }

  getInValidatedUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/user')
      .pipe(
        tap(users => console.log('fetched users'))
      );
  }

  setJobVerified(id: number): Observable<JobListing> {
    const url = `${this.baseUrl}/joblisting/setIsVerified/${id}`;
    return this.http.put<JobListing>(url, {'isVerified': true})
      .pipe(
        tap(user => console.log('job ' + id + ' is Verified'))
      );
  }

  setJobRefused(id: number) {

  }

  setUserVerified(id: number): Observable<JobListing> {
    console.log(id);
    const url = `${this.baseUrl}/user/setIsVerified/${id}`;
    return this.http.put<JobListing>(url, {'isVerified': true})
      .pipe(
        tap(user => console.log('user ' + id + ' is Verified'))
      );
  }

  setUserRefused(id: number) {

  }
}
