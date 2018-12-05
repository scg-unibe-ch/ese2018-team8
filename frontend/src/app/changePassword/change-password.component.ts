import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AlertService} from '../alert/alert.alertservice';
import {first} from 'rxjs/operators';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
    changePasswordForm: FormGroup;
  baseUrl: string;
  loading = false;
  submitted = false;


  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private router: Router,
              private alertService: AlertService) {
      this.baseUrl = environment.baseUrl;
  }

    ngOnInit() {
        this.changePasswordForm = this.formBuilder.group({
            oldPassword: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
        // }, {
        //    validator: PasswordValidation.MatchPassword // your validation method
        });
    }

    get f() { return this.changePasswordForm.controls; }

    onSubmit() {

      this.submitted = true;

        // stop here if form is invalid
      if (this.changePasswordForm.invalid) {
        return;
      }


      this.httpClient.put(this.baseUrl + '/auth/change-password', {
            'oldPassword': this.f.oldPassword.value,
            'newPassword': this.f.password.value,

        }).pipe(first()).subscribe(
            data => {
              this.alertService.success('Passwort geändert', true);
               this.router.navigate(['/dashboard']);
            },
            error => {
              this.alertService.error(error);
            });
      this.loading = false;

        // this.router.navigate(['']);
    }

}
