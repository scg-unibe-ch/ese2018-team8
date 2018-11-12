import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobListing} from '../models/joblisting';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {JoblistdetailComponent} from '../joblistdetail/joblistdetail.component';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Skill} from '../models/skill';

@Component({
  selector: 'app-createjoblist',
  templateUrl: './createjoblist.component.html',
  styleUrls: ['./createjoblist.component.css']
})
export class CreatejoblistComponent implements OnInit {
 // title = 'Jobportal';
  joblisting: JobListing = new JobListing(
    null,
    '',
    '',
    false,
    null,
    0,
    0,
    0,
    null,
    '',
    '',
    ''
    );
  // jobListingList: JobListing[] = [];

  baseUrl = environment.baseUrl;
  joblistDetail;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {/*
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
  */}

  onJobListingCreate() {
    this.joblisting = new JobListing(
        this.joblisting.id,
        this.joblisting.title,
        this.joblisting.description,
        this.joblisting.isVerified,
        this.joblisting.brancheId,
        this.joblisting.jobPensumFrom,
        this.joblisting.jobPensumTo,
        this.joblisting.payment,
        this.joblisting.companyId,
        this.joblisting.contactPerson,
        this.joblisting.contactPhone,
        this.joblisting.contactEmail);
    this.httpClient.post(this.baseUrl + '/joblisting', this.joblisting)
        .pipe(map ( joblisting => {
          this.joblistDetail(this.joblisting);
        }));
    this.httpClient.post(this.baseUrl + '/joblisting', {
      'title': this.joblisting.title,
      'description': this.joblisting.description,
      // 'brancheId': this.joblisting.brancheId,
      'jobPensum': {'jobPensumFrom': this.joblisting.jobPensumFrom, 'jobPensumTo': this.joblisting.jobPensumTo},
      'payment': this.joblisting.payment,
      // 'companyId': this.joblisting.companyId,
      'contactPerson': this.joblisting.contactPerson,
      'contactPhone': this.joblisting.contactPhone,
      'contactEmail': this.joblisting.contactEmail
    }).pipe(map ((instance: any) => {


    }));
    }


  /*
  onJobListingDestroy(jobListing: JobListing) {
    // this.jobListingList.splice(this.jobListingList.indexOf(jobListing), 1);
  }
    this.jobListingList.splice(this.jobListingList.indexOf(jobListing), 1);
  }*/
}
