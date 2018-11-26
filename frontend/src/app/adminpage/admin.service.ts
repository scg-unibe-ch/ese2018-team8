import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {JobListing} from '../models/joblisting';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {AlertService} from '../alert/alert.alertservice';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient,
              private alertService: AlertService) { }

  getInValidatedJoblistings(): Observable<JobListing[]> {
    return this.httpClient.get<JobListing[]>(this.baseUrl + '/joblisting')
        .pipe(
            tap(jobs => console.log('fetched jobs'))
        );
  }

  getInValidatedUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + '/user')
        .pipe(
            tap(users => console.log('fetched users'))
        );
  }

  getAllJoblistings(): Observable<JobListing[]> {
    return this.httpClient.get<JobListing[]>(this.baseUrl + '/joblisting')
        .pipe(
            tap(jobs => console.log('fetched jobs'))
        );
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + '/user')
        .pipe(
            tap(users => console.log('fetched users'))
        );
  }

  setJobVerified(id: number): Observable<JobListing> {
    const url = `${this.baseUrl}/joblisting/setIsVerified/${id}`;
    return this.httpClient.put<JobListing>(url, {'isVerified': true})
          .pipe(
              tap(user => console.log('job ' + id + ' is Verified'))
          );
  }

  setJobRefused(id: number) {

  }

  setUserVerified(id: number): Observable<User> {
    const url = `${this.baseUrl}/user/setIsVerified/${id}`;
    return this.httpClient.put<User>(url, {'isVerified': true})
        .pipe(
            tap(user => console.log('user ' + id + ' is Verified'))
        );
  }

  setUserRefused(id: number) {

  }

  deleteJob(id: number): Observable<JobListing> {
    const url = `${this.baseUrl}/joblisting/${id}`;
    return this.httpClient.delete<JobListing>(url)
        .pipe(
            tap(job => console.log('job ' + job.id + ' is deleted'))
        );
  }

  deleteUser(id: number): Observable<User> {
    const url = `${this.baseUrl}/user/${id}`;
    return this.httpClient.delete<User>(url)
        .pipe(
            tap(user => console.log('user ' + user.id + ' is deleted'))
        );
  }

}
