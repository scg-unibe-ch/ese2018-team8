import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { JobListing } from './joblisting';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  joblisting: JobListing = new JobListing(null, '', '');
  jobListingList: JobListing[] = [];
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.httpClient.get(this.baseUrl + '/joblisting').subscribe((instances: any) => {
      this.jobListingList = instances.map((instance) => new JobListing(instance.id, instance.title, instance.description));
    });
  }

  onJobListingCreate() {
    this.httpClient.post(this.baseUrl + '/joblisting', {
      'title': this.joblisting.title,
      'description': this.joblisting.description
    }).subscribe((instance: any) => {
      this.joblisting.id = instance.id;
      this.jobListingList.push(this.joblisting);
      this.joblisting = new JobListing(null, '', '');
    });
  }

  onJobListingDestroy(jobListing: JobListing) {
    this.jobListingList.splice(this.jobListingList.indexOf(jobListing), 1);
  }

}
