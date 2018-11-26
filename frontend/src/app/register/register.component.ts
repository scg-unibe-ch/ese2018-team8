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
            email: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
            companyName: ['', Validators.required],
            companyStreet: ['', Validators.required],
            companyZIP: ['', Validators.required],
            companyCity: ['', Validators.required],
            companyPhone: ['', Validators.required],
            companyPerson: ['', Validators.required],
<<<<<<< HEAD
            companyWebpage: ['', Validators.required]

          // }, {
=======
            companyWebsite: ['', Validators.required]
        // }, {
>>>>>>> 976e89098db772ae345f57686e9b89bd65df9cdc
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
            'email': this.f.email.value,
            'password': this.f.password.value,
            'company': {
                'companyName': this.f.companyName.value,
                'companyStreet': this.f.companyStreet.value,
                'companyZIP': this.f.companyZIP.value,
                'companyCity': this.f.companyCity.value,
                'companyPhone': this.f.companyPhone.value,
                'companyPerson': this.f.companyPerson.value,
<<<<<<< HEAD
                'companyWebpage': this.f.companyWebpage.value
=======
                'companyWebsite': this.f.companyWebsite.value
>>>>>>> 976e89098db772ae345f57686e9b89bd65df9cdc
            }
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
