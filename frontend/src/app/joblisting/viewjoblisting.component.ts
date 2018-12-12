import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JobListing} from '../models/joblisting';
import {JoblistingService} from './joblisting.service';

@Component({
  selector: 'app-viewjoblisting',
  templateUrl: './viewjoblisting.component.html',
  styleUrls: ['./viewjoblisting.component.css'],
  providers: [JoblistingService]
})
export class ViewjoblistingComponent implements OnInit {
  searchString: string;
  jobListingList: JobListing[];
  baseUrl;
  constructor(private http: HttpClient,
              private joblistingService: JoblistingService) { }

  getJobs() {
    this.joblistingService.getJobs()
      .subscribe( jobs => {
        this.jobListingList = jobs;
        console.log('Data from joblistingService:' + this.jobListingList);
      });
  }

  ngOnInit(
    baseUrl = environment.baseUrl
  ) {
    this.getJobs();
  }
    onChange() {
        this.joblistingService.getJobsSearch(this.searchString)
            .subscribe( jobs => {
                this.jobListingList = jobs;
                console.log('Data from joblistingService:' + this.jobListingList);
            });
    }
}
