import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Token} from '../models/token';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../alert/alert.alertservice';
import {AuthenticationService} from '../login/login.authservice';
import {Company} from '../models/company';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

    companyEditForm: FormGroup;
    loading = false;
    submitted = false;
    token: Token = new Token(null, '', null);

    @Input()
    company: Company;

    baseUrl = environment.baseUrl;
    returnUrl: string;

    constructor(private httpClient: HttpClient,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private alertService: AlertService,
                private router: Router,
                private authService: AuthenticationService) {}

    ngOnInit() {
        this.companyEditForm = this.formBuilder.group({
            companyName: ['', Validators.required],
            companyStreet: ['', Validators.required],
            companyZIP: ['', Validators.required],
            companyCity: ['', Validators.required],
            companyPhone: ['', Validators.required],
            companyPerson: ['', Validators.required],
            companyWebsite: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.token = this.authService.getVerifiedToken();
        this.httpClient.get(this.baseUrl + '/company/byUserId', {
            params:  new HttpParams().set('userId', '' + this.token.id)
        }).subscribe((instance: any) => {
            this.company =  new Company(instance.id,
                instance.userId,
                instance.companyName,
                instance.companyStreet,
                instance.companyZIP,
                instance.companyCity,
                instance.companyPhone,
                instance.companyPerson,
                instance.companyWebsite);
            this.setFormData();
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.companyEditForm.controls; }


    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.companyEditForm.invalid) {
            return;
        }

        this.loading = true;

        this.getCompanyData();

        this.httpClient.put(this.baseUrl + '/company/' + this.company.id, this.company)
            .subscribe((instance: any) => {
                    this.router.navigate([this.returnUrl]);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    getCompanyData() {
        this.company.companyName = this.f.companyName.value;
        this.company.companyStreet = this.f.companyStreet.value;
        this.company.companyZIP = this.f.companyZIP.value;
        this.company.companyCity = this.f.companyCity.value;
        this.company.companyPhone = this.f.companyPhone.value;
        this.company.companyPerson = this.f.companyPerson.value;
        this.company.companyWebsite = this.f.companyWebsite.value;

    }

    setFormData() {
        this.f.companyName.setValue(this.company.companyName, []);
        this.f.companyStreet.setValue(this.company.companyStreet, []);
        this.f.companyZIP.setValue(this.company.companyZIP, []);
        this.f.companyCity.setValue(this.company.companyCity, []);
        this.f.companyPhone.setValue(this.company.companyPhone, []);
        this.f.companyPerson.setValue(this.company.companyPerson, []);
        this.f.companyWebsite.setValue(this.company.companyWebsite, []);
    }
}