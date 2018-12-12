import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { JobListing} from '../models/joblisting';
import { environment} from '../../environments/environment';
import { Observable} from 'rxjs';
import {first, map, tap} from 'rxjs/operators';
import {Company} from '../models/company';



@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  joblisting: JobListing;
  baseUrl = environment.baseUrl;
  private companyList: Company[];
  constructor(private http: HttpClient) { }

  getJobs(): Observable<JobListing[]> {
    return this.http.get<JobListing[]>(this.baseUrl + '/joblisting/private')
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

  updateJob(joblisting: JobListing): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.baseUrl}/joblisting/${joblisting.id}`, joblisting, httpOptions) // UPDATE /company-edit-job/ID
      .pipe(tap(jobs => console.log(`updated job id=${joblisting.id}`)));
  }

  deleteJob (id: number): Observable<{}> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    const url = `${this.baseUrl}/joblisting/${id}`; // DELETE /company-edit-job/ID
    return this.http.delete(url, httpOptions);
  }
  
  getCompanyData(): Observable<Company[]> {
    return this.http.get<Company[]>(this.baseUrl + '/company')
        .pipe(
            map(company => this.companyList = company));
  }
}
