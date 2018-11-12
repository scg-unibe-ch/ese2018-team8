import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JobListing} from '../models/joblisting';
import {JoblistingService} from '../joblisting/joblisting.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-joblistdetail',
  templateUrl: './joblistdetail.component.html',
  styleUrls: ['./joblistdetail.component.css'],
  providers: [JoblistingService]
})
export class JoblistdetailComponent implements OnInit {
  jobListingList: JobListing[] = [];
  baseUrl;

  constructor(private http: HttpClient,
              private joblistingService: JoblistingService,
              private location: Location) { }

  /*getJob(jobId) {
    this.joblistingService.getJob(jobId)
      .subscribe( job => {
        this.jobListingList = job;
        console.log('Data from joblistingService:' + this.jobListingList);
      });
  }

  goBack(): void {
    this.location.back();
  }
*/
  ngOnInit(
    baseUrl = environment.baseUrl
  ) {
  }

}
