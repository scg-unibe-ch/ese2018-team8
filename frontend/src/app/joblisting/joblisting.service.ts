import { Injectable } from '@angular/core';
// Because we want to use service to communicate
// with a httpClient we import the following
import {HttpClient} from '@angular/common/http';
import {JobListing} from '../joblisting';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JoblistingService {
// Here in this class we can create an instance
// from httpClient
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getJobs() {
    return this.http.get<JobListing[]>(this.baseUrl + '/joblisting');
  }
  getJob(jobId) {
    return this.http.get<JobListing[]>(this.baseUrl + '/joblisting' + jobId);
  }

}
