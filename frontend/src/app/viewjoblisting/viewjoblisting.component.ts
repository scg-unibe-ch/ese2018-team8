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
  jobListingList: JobListing[];
  baseUrl;
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

  ngOnInit(
    baseUrl = environment.baseUrl
  ) {
    this.getJobs();
  }

}
