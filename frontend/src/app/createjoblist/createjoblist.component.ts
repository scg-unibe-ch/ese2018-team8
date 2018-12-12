import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobListing} from '../models/joblisting';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../alert/alert.alertservice';
import {AuthenticationService} from '../login/login.authservice';
import {Token} from '../models/token';

/**
 * Business users can create their own joblistings. Creating joblistings is handled in this
 * createjoblist component. Data for joblistings is gathered by createjoblist html, where a
 * form is provided to the user.
 */
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
      '',
      '',
      false
  );

  baseUrl = environment.baseUrl;
  returnUrl: string;

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private router: Router,
              private authService: AuthenticationService) {}

  /**
   * Create FormBuilder object and corresponding form validator for checking input data.
   */
  ngOnInit() {
    this.createJoblistForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      skills: ['', Validators.required],
      branche: ['', Validators.required],
      pensumFrom: ['', Validators.required],
      pensumTo: ['', Validators],
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

  /**
   * If user clicks 'Erstellen', data is sent to the server via post request (locally created joblisting object).
   */
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
              this.alertService.success('Ihr Inserat wurde erstellt und ist unter "Eigene Inserate" einsehbar. ' +
                  'Sobald das Inserat verifiziert wurde, ist es öffentlich zugänglich.');
              this.router.navigate([this.returnUrl]);
            },
            error => {
              this.alertService.error(error);
            });
    this.loading = false;
  }

  /**
   * Fill in joblisting fields with form data. Local object joblisting will then be used in post request.
   */
  createJoblisting() {

    if (this.f.pensumTo.value === '') {
      this.joblisting.jobPensumTo = 0;
    } else {
      this.joblisting.jobPensumTo = this.f.pensumTo.value;
    }
    this.joblisting.id = 0;
    this.joblisting.title = this.f.title.value;
    this.joblisting.description = this.f.description.value;
    this.joblisting.skills = this.f.skills.value;
    this.joblisting.isVerified = false;
    this.joblisting.branche = this.f.branche.value;
    this.joblisting.jobPensumFrom = this.f.pensumFrom.value;
    // this.joblisting.jobPensumTo = this.f.pensumTo.value;
    this.joblisting.payment = this.f.payment.value;
    this.joblisting.deadline = this.f.deadline.value;
    this.joblisting.companyId = this.token.companyId;
    this.joblisting.contactPerson = this.f.contactPerson.value;
    this.joblisting.contactPhone = this.f.contactPhone.value;
    this.joblisting.contactEmail = this.f.contactEmail.value;
  }
}
