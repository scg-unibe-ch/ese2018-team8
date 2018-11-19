import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JobListing} from '../../models/joblisting';
import {JoblistingService} from '../joblisting.service';

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
              private joblistingService: JoblistingService) { }

  getJobs() {
    this.joblistingService.getJobs()
      .subscribe( jobs => {
        this.jobListingList = jobs;
      });
  }

  ngOnInit(
    baseUrl = environment.baseUrl
  ) {
    this.getJobs();
  }

}
