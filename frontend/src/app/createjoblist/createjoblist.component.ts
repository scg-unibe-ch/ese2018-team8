import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobListing} from '../models/joblisting';
import {environment} from '../../environments/environment';
import {first, map} from 'rxjs/operators';
import {JoblistdetailComponent} from '../joblistdetail/joblistdetail.component';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Skill} from '../models/skill';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../alert/alert.alertservice';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-createjoblist',
  templateUrl: 'createjoblist.component.html',
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
              private formBuilder: FormBuilder) {}


  ngOnInit() {
    this.createJoblistForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      branche: ['', Validators.required],
      pensumFrom: [0, Validators.required],
      pensumTo: [0, Validators.required],
      payment: [0, Validators.required],
      contactPerson: ['', Validators.required],
      contactPhone: ['', Validators.required],
      contactEmail: ['', Validators.required]
    });


  }

  // convenience getter for easy access to form fields
  get f() { return this.createJoblistForm.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createJoblistForm.invalid) {
      return;
    }

    this.loading = true;

    this.joblisting = new JobListing(
        this.joblisting.id,
        this.f.title.value,
        this.f.description.value,
        this.joblisting.isVerified,
        this.f.brancheId.value,
        this.f.jobPensumFrom.value,
        this.f.jobPensumTo.value,
        this.f.payment.value,
        this.f.companyId.value,
        this.f.contactPerson.value,
        this.f.contactPhone.value,
        this.f.contactEmail.value);
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
