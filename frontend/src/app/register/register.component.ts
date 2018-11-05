import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PasswordValidation } from './register.password.validator';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  baseUrl: string;

  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private router: Router) {
      this.baseUrl = environment.baseUrl;
  }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required]
        }, {
            validator: PasswordValidation.MatchPassword // your validation method
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.httpClient.post(this.baseUrl + '/auth/register', {
            'name': this.f.username.value,
            'email': this.f.email.value,
            'password': this.f.password.value
        });
        this.router.navigate(['']);
    }

}
