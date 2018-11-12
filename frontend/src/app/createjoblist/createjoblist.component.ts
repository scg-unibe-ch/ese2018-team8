import { Component, OnInit } from '@angular/core';
import {JobListing} from '../joblisting';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JoblistdetailComponent} from '../joblistdetail/joblistdetail.component';

@Component({
  selector: 'app-createjoblist',
  templateUrl: './createjoblist.component.html',
  styleUrls: ['./createjoblist.component.css']
})
export class CreatejoblistComponent implements OnInit {
  joblisting: JobListing = new JobListing(null, '', '', false, null,
      0, 0, 0, null, '', '', '');
  baseUrl = environment.baseUrl;
  joblistDetail;

  constructor(private httpClient: HttpClient) {
    this.joblistDetail = new JoblistdetailComponent();
  }

  ngOnInit() {/*
    this.httpClient.get(this.baseUrl + '/joblisting').subscribe((instances: any) => {
      this.jobListingList = instances.map((instance) => new JobListing(instance.id, instance.title, instance.description));
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
  }

  onJobListingDestroy(jobListing: JobListing) {
    // this.jobListingList.splice(this.jobListingList.indexOf(jobListing), 1);
  }
}
