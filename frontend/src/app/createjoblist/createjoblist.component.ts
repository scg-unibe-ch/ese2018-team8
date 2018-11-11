import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobListing} from '../joblisting';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Skill} from '../skill';

@Component({
  selector: 'app-createjoblist',
  templateUrl: './createjoblist.component.html',
  styleUrls: ['./createjoblist.component.css']
})
export class CreatejoblistComponent implements OnInit {
  title = 'Jobportal';
  joblisting: JobListing = new JobListing(
    null,
    '',
    '',
    true,
    null,
    null,
    null,
    null,
    null,
    '',
    '',
    '',
    );
  jobListingList: JobListing[] = [];
  baseUrl = environment.baseUrl;


  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get(this.baseUrl + '/joblisting').subscribe((instances: any) => {
      this.jobListingList = instances.map((instance) => new JobListing(
        instance.id,
        instance.title,
        instance.description,
        instance.isVerified,
        instance.brancheId,
        instance.jobPensumFrom,
        instance.jobPensumTo,
        instance.payment,
        instance.companyId,
        instance.contactPerson,
        instance.contactPhone,
        instance.contactEmail));
    });
  }

  onJobListingCreate() {
    this.httpClient.post(this.baseUrl + '/joblisting', {
      'title': this.joblisting.title,
      'description': this.joblisting.description
    }).subscribe((instance: any) => {
      this.joblisting.id = instance.id;
      this.jobListingList.push(this.joblisting);
      this.joblisting = new JobListing(
        null,
        '',
        '',
        true,
        null,
        null,
        null,
        null,
        null,
        '',
        '',
        '');
    });
  }

  onJobListingDestroy(jobListing: JobListing) {
    this.jobListingList.splice(this.jobListingList.indexOf(jobListing), 1);
  }

}
