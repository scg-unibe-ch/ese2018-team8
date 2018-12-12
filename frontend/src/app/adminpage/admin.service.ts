import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {JobListing} from '../models/joblisting';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {AlertService} from '../alert/alert.alertservice';
import {Company} from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient,
              private alertService: AlertService) { }

  /**
   * Get all joblistings from database and return them as Observable of type JobListing[].
   */
  getAllJoblistings(): Observable<JobListing[]> {
    return this.httpClient.get<JobListing[]>(this.baseUrl + '/joblisting')
        .pipe(
            tap(jobs => console.log('fetched jobs'))
        );
  }

  /**
   * Get all users from database and return them as Observable of type User[].
   */
  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + '/user')
        .pipe(
            tap(users => console.log('fetched users'))
        );
  }

  /**
   * Get all companies from database and return them as Observable of type Company[].
   */
  getCompanyData(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.baseUrl + '/company')
        .pipe(
            tap(company => console.log('companies fetched'))
        );
  }

  /**
   * Set joblisting verified as indicated by admin user.
   * @param id - joblisting id to be verified
   */
  setJobVerified(id: number): Observable<JobListing> {
    const url = `${this.baseUrl}/joblisting/setIsVerified/${id}`;
    return this.httpClient.put<JobListing>(url, {'isVerified': true})
          .pipe(
              tap(user => console.log('job ' + id + ' is Verified'))
          );
  }

  /**
   * Set joblisting refused. Refusal needs to be explained in reason.
   * @param id - joblisting id to be refused
   * @param reason - reason why a joblisting is refused
   */
  setJobRefused(id: number, reason: string) {
    const url = `${this.baseUrl}/joblisting/setIsVerified/${id}`;
    return this.httpClient.put<JobListing>(url, {
      'isVerified': false,
      'comment': reason})
        .pipe(
            tap(user => console.log('joblisting ' + id + ' is refused'))
        );

  }

  /**
   * Set user verified as indicated by admin user.
   * @param id - user id to be verified
   */
  setUserVerified(id: number): Observable<User> {
    const url = `${this.baseUrl}/user/setIsVerified/${id}`;
    return this.httpClient.put<User>(url, {'isVerified': true})
        .pipe(
            tap(user => console.log('user ' + id + ' is Verified'))
        );
  }

  /**
   * Set user refused. Refusal needs to be explained in reason.
   * @param id - user id to be refused
   * @param reason - reason, why a user is refused.
   */
  setUserRefused(id: number, reason: string) {
    const url = `${this.baseUrl}/user/setIsVerified/${id}`;
    return this.httpClient.put<User>(url, {
      'isVerified': false,
      'comment': reason})
        .pipe(
            tap(user => console.log('user ' + id + ' is refused'))
        );
  }

  /**
   * Delete joblisting as indicated by admin user.
   * @param id - joblisting id to be deleted
   */
  deleteJob(id: number): Observable<JobListing> {
    const url = `${this.baseUrl}/joblisting/${id}`;
    return this.httpClient.delete<JobListing>(url)
        .pipe(
            tap(job => console.log('job ' + job.id + ' is deleted'))
        );
  }

  /**
   * Delete user as indicated by admin user.
   * @param id - user id to be deleted.
   */
  deleteUser(id: number): Observable<User> {
    const url = `${this.baseUrl}/user/${id}`;
    return this.httpClient.delete<User>(url)
        .pipe(
            tap(user => console.log('user ' + user.id + ' is deleted'))
        );
  }


}
