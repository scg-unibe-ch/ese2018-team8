import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from './login.authservice';
import {AlertService} from '../alert/alert.alertservice';
import {first} from 'rxjs/operators';

/**
 * Login component provides a login form to the user where he/she can log in to his/her account.
 * Authentication is handled by using JSON web token (JWT), which has to be present in request header (jwt
 * interceptor adds jwt automatically to request header if user is logged in).
 * There are three different user roles for authorization purposes:
 * - Student (does not have an account)
 * - Business (has an account, can create own joblistings and delete them)
 * - Admin (has an account, cannot create joblistings but can verify and delete them as well as
 * verify and delete users).
 */

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService) {}

  /**
   * Create form FormBuilder object and corresponding form validator for checking input data.
   */
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * If login data is valid, send it to authenticationService which will handle get request
   * to the server.
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    // login().pipe(first()) takes the first value returned from server
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe( (instance: any) => {
              this.alertService.success('Sie sind eingeloggt!', true);
              this.router.navigate([this.returnUrl]);
            },
            error => {
              this.alertService.error(error);
              this.loading = false;
            });
  }
}
