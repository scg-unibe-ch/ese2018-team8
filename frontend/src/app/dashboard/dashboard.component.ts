import {Component, OnInit} from '@angular/core';
import { JoblistingService} from '../joblisting/joblisting.service';
import {JobListing} from '../models/joblisting';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  jobListingList: JobListing[] = [];

  constructor(private joblistingService: JoblistingService) {}

  /*Calls getJobs() method automatically when loading this component.*/
  ngOnInit() {
    this.getJobs();
  }

  /*Gets joblistings from database and lists only the first 4 joblistings.*/
  getJobs() {
    this.joblistingService.getJobs()
      .subscribe( jobs => {
        this.jobListingList = jobs.slice(0, 4);
      });
  }

}
