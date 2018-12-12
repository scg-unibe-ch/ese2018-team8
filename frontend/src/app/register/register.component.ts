import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PasswordValidation } from './register.password.validator';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AlertService} from '../alert/alert.alertservice';
import {first} from 'rxjs/operators';

/**
 * Register component provides a registering form to users where important user
 * data is gathered:
 * - User name (i.e. user email)
 * - Password and password confirmation
 * - Company name, street, ZIP and city
 * - Phone number and name of a contact person
 * - Company website (optional)
 */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  baseUrl: string;
  loading = false;
  submitted = false;
  registered = false;

  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private router: Router,
              private alertService: AlertService) {
      this.baseUrl = environment.baseUrl;
  }

  /**
   * create FormBuilder object and corresponding validators. Validators are used
   * in HTML for check if input data is valid.
   */

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
            companyPerson: ['', Validators.required]
        // }, {
        //    validator: PasswordValidation.MatchPassword // your validation method
        });
    }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  /**
   * When user clicks 'Registrieren', onSubmit() method is called and form input data is sent to the
   * server. However, if input data is not valid, user is navigated back to the form and gets corresponding
   * messages on which fields have to be filled in.
   */
    onSubmit() {
        // this.registerForm = this.formBuilder.group( {validator: PasswordValidation.MatchPassword});
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
        return;
      }

      this.registered = true;

      // Post request to server providing user data in request body.
      // Error handling in subscription uses alertService in order to inform the user.
      this.httpClient.post(this.baseUrl + '/auth/register', {
            'email': this.f.email.value,
            'password': this.f.password.value,
            'company': {
                'companyName': this.f.companyName.value,
                'companyStreet': this.f.companyStreet.value,
                'companyZIP': this.f.companyZIP.value,
                'companyCity': this.f.companyCity.value,
                'companyPhone': this.f.companyPhone.value,
                'companyPerson': this.f.companyPerson.value
            }
        }).pipe(first())
          .subscribe((instance: any) => {
              this.alertService.success('Sie sind registriert! Sobald Ihr Benutzer verifiziert wurde, können Sie sich' +
                  ' anmelden.', true);
              this.router.navigate(['/login']);
            },
            error => {
              this.registered = false;
              this.alertService.error(error);
            });
      this.loading = false;

      this.router.navigate(['']);
    }

}
