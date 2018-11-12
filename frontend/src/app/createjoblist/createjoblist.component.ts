import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobListing} from '../models/joblisting';
import {environment} from '../../environments/environment';
import {first, map} from 'rxjs/operators';
import {JoblistdetailComponent} from '../joblistdetail/joblistdetail.component';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Skill} from '../models/skill';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../alert/alert.alertservice';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-createjoblist',
  templateUrl: './createjoblist.component.html',
  styleUrls: ['./createjoblist.component.css']
})
export class CreatejoblistComponent implements OnInit {
  createJoblistForm: FormGroup;
  loading = false;
  submitted = false;
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
  returnUrl: string;

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) {
  }


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
  */
  }

  onJobListingCreate() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createJoblistForm.invalid) {
      return;
    }

    this.loading = true;

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
        .pipe(map(joblisting => {
          this.joblistDetail(this.joblisting);
        }));

    /*
    onJobListingDestroy(jobListing: JobListing) {
      // this.jobListingList.splice(this.jobListingList.indexOf(jobListing), 1);
    }
      this.jobListingList.splice(this.jobListingList.indexOf(jobListing), 1);
    }*/
  }
}
