import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobListing} from '../models/joblisting';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../alert/alert.alertservice';
import {AuthenticationService} from '../login/login.authservice';
import {Token} from '../models/token';

@Component({
  selector: 'app-createjoblist',
  templateUrl: 'createjoblist.component.html',
})
export class CreatejoblistComponent implements OnInit {
  createJoblistForm: FormGroup;
  loading = false;
  submitted = false;
  token: Token = new Token(null, '', null);
  joblisting: JobListing = new JobListing(
      null,
      '',
      '',
      '',
      false,
      '',
      0,
      0,
      0,
      null,
      null,
      '',
      '',
      ''
  );

  baseUrl = environment.baseUrl;
  returnUrl: string;

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private router: Router,
              private authService: AuthenticationService) {}


  ngOnInit() {
    this.createJoblistForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
        skills: ['', Validators.required],
      branche: ['', Validators.required],
      pensumFrom: ['', Validators.required],
      pensumTo: ['', Validators.required],
      payment: ['', Validators.required],
        deadline: ['', Validators.required],
      contactPerson: ['', Validators.required],
      contactPhone: ['', Validators.required],
      contactEmail: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.token = this.authService.getVerifiedToken();
    console.log(this.token);

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

    this.createJoblisting();

    this.httpClient.post(this.baseUrl + '/joblisting', this.joblisting)
        .subscribe((instance: any) => {
              this.router.navigate([this.returnUrl]);
              this.loading = false;
            },
            error => {
              this.alertService.error(error);
              this.loading = false;
            });
  }

  createJoblisting() {
    this.joblisting.id = 0;
    this.joblisting.title = this.f.title.value;
    this.joblisting.description = this.f.description.value;
      this.joblisting.skills = this.f.skills.value;

          this.joblisting.isVerified = false;
    this.joblisting.branche = this.f.branche.value;
    this.joblisting.jobPensumFrom = this.f.pensumFrom.value;
    this.joblisting.jobPensumTo = this.f.pensumTo.value;
    this.joblisting.payment = this.f.payment.value;
    this.joblisting.deadline = this.f.deadline.value;
    this.joblisting.companyId = this.token.companyId;
    this.joblisting.contactPerson = this.f.contactPerson.value;
    this.joblisting.contactPhone = this.f.contactPhone.value;
    this.joblisting.contactEmail = this.f.contactEmail.value;
  }
}
