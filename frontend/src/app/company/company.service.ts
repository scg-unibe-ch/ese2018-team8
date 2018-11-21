import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { JobListing} from '../models/joblisting';
import { environment} from '../../environments/environment';
import { Observable} from 'rxjs';
import { tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getJobs(): Observable<JobListing[]> {
    return this.http.get<JobListing[]>(this.baseUrl + '/joblisting')
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

  updateJob(job: JobListing): Observable<any> {
    return this.http.put(this.baseUrl, job, httpOptions).pipe(
      tap(_ => console.log(`updated hero id=${job.id}`)),
    );
  }

}
