import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobListing} from '../models/joblisting';
import {environment} from '../../environments/environment';
import {first, map} from 'rxjs/operators';
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
      '',
      0,
      0,
      0,
      null,
      '',
      '',
      ''
  );

  baseUrl = environment.baseUrl;
  returnUrl: string;

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {}


  ngOnInit() {
    this.createJoblistForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      branche: ['', Validators.required],
      pensumFrom: ['', Validators.required],
      pensumTo: ['', Validators.required],
      payment: ['', Validators.required],
      contactPerson: ['', Validators.required],
      contactPhone: ['', Validators.required],
      contactEmail: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

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
        this.f.branche.value,
        this.f.pensumFrom.value,
        this.f.pensumTo.value,
        this.f.payment.value,
        this.joblisting.companyId,
        this.f.contactPerson.value,
        this.f.contactPhone.value,
        this.f.contactEmail.value);
    console.log(JSON.stringify(this.joblisting));
    this.httpClient.post<any>(this.baseUrl + '/joblisting', this.joblisting)
        .subscribe( (instance: any) => {
                  // this.router.navigate([this.returnUrl]);
              this.loading = false;

            },
                error => {
                  // this.alertService.error(error);
                  this.loading = false;
                });

    /*
    onJobListingDestroy(jobListing: JobListing) {
      // this.jobListingList.splice(this.jobListingList.indexOf(jobListing), 1);
    }
      this.jobListingList.splice(this.jobListingList.indexOf(jobListing), 1);
    }*/
  }
}
