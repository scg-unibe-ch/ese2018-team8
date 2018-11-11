import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JobListing} from '../joblisting';
import {JoblistingService} from '../joblisting/joblisting.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-viewjoblisting',
  templateUrl: './viewjoblisting.component.html',
  styleUrls: ['./viewjoblisting.component.css'],
  providers: [JoblistingService]
})
export class ViewjoblistingComponent implements OnInit {
  jobListingList: JobListing[] = [];
  baseUrl;
  jobId = this.jobId;
  constructor(private http: HttpClient,
              private joblistingService: JoblistingService,
              private router: Router) { }

  getJobs() {
    this.joblistingService.getJobs()
      .subscribe( jobs => {
        this.jobListingList = jobs;
        console.log('Data from joblistingService:' + this.jobListingList);
      });
  }
  getJob(jobId) {
    return this.http.get<JobListing[]>(this.baseUrl + '/joblisting' + jobId)
      .subscribe( jobs => {
        this.jobListingList = jobs;
        console.log('Data from joblistingService:' + this.jobListingList);
      });
  }

  goToDetails() {
    let routerId = this.jobId;
    this.router.navigate(['joblistdetail', 'routerId']);
  }


  ngOnInit(
    baseUrl = environment.baseUrl
  ) {
    this.getJobs();
    this.getJob(this.jobId);
  }

}
