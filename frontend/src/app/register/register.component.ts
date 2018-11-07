import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PasswordValidation } from './register.password.validator';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AlertService} from '../alert/alert.alertservice';
import {first} from 'rxjs/operators';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  baseUrl: string;
  loading = false;


  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private router: Router,
              private alertService: AlertService) {
      this.baseUrl = environment.baseUrl;
  }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required]
        // }, {
        //    validator: PasswordValidation.MatchPassword // your validation method
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        // this.registerForm = this.formBuilder.group( {validator: PasswordValidation.MatchPassword});

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.httpClient.post(this.baseUrl + '/auth/register', {
            'name': this.f.username.value,
            'email': this.f.email.value,
            'password': this.f.password.value
        }).pipe(first()).subscribe(
            data => {
              this.alertService.success('Registration successful', true);
              this.router.navigate(['/login']);
            },
            error => {
              this.alertService.error(error);
              this.loading = false;
            });

        this.router.navigate(['']);
    }

}
