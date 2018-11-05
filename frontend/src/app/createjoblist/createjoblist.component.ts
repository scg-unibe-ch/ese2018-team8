import { Component, OnInit } from '@angular/core';
import {JobListing} from '../joblisting';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-createjoblist',
  templateUrl: './createjoblist.component.html',
  styleUrls: ['./createjoblist.component.css']
})
export class CreatejoblistComponent implements OnInit {
  title = 'Jobportal';
  joblisting: JobListing = new JobListing(null, '', '', false, null,
      0, 0, 0,null, '', '', '');
  jobListingList: JobListing[] = [];
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {/*
    this.httpClient.get(this.baseUrl + '/joblisting').subscribe((instances: any) => {
      this.jobListingList = instances.map((instance) => new JobListing(instance.id, instance.title, instance.description));
    });
  */}

  onJobListingCreate() {
    this.httpClient.post(this.baseUrl + '/joblisting', {
      'id': this.joblisting.id,
      'title': this.joblisting.title,
      'description': this.joblisting.description,
      'isVerified': this.joblisting.isVerified,
      'brancheId': this.joblisting.brancheId,
      // 'jobPensum': this.joblisting.jobPensum {jobPensumFrom, jobPensumTo},
      /*'jobPensumTo': this.joblisting.jobPensumTo,*/
      'payment': this.joblisting.payment,
      'companyId': this.joblisting.companyId,
      'contactPerson': this.joblisting.contactPerson,
      'contactPhone': this.joblisting.contactPhone,
      'contactEmail': this.joblisting.contactEmail
    }).subscribe((instance: any) => {/*
      this.joblisting.id = instance.id;
      this.jobListingList.push(this.joblisting);
      this.joblisting = new JobListing(null, '', '');
    */});
  }

  onJobListingDestroy(jobListing: JobListing) {
    this.jobListingList.splice(this.jobListingList.indexOf(jobListing), 1);
  }
}
