import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from './login.authservice';
import {AlertService} from '../alert/alert.alertservice';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
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
