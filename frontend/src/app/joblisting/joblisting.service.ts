import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {JobListing} from '../models/joblisting';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JoblistingService {
// Here in this class we can create an instance
// from httpClient
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getJobs(): Observable<JobListing[]> {
    return this.http.get<JobListing[]>(this.baseUrl + '/joblisting/public')
      .pipe(
        tap(jobs => console.log('fetched jobs'))
      );
  }

  getJobsSearch(searchString: string): Observable<JobListing[]> {
        return this.http.get<JobListing[]>(this.baseUrl + '/joblisting/public', {
            params:  new HttpParams().set('search', '' + encodeURI(searchString))
        })
            .pipe(
                tap(jobs => console.log('fetched jobs'))
            );
  }

  getJob(id: number): Observable<JobListing> {
    const url = `${this.baseUrl}/joblisting/${id}`;
    return this.http.get<JobListing>(url)
      .pipe(
      tap(jobs => console.log(`fetched job id=${id}`))
    );
  }

}
