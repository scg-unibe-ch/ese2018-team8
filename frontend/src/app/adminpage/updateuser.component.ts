import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JobListing} from '../models/joblisting';
import {User} from '../models/user';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from './admin.service';
import {UserService} from '../login/user.service';
import {JoblistingService} from '../joblisting/joblisting.service';
import {CompanyService} from '../company/company.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html'
})
export class UpdateUserComponent implements OnInit {

  baseUrl = environment.baseUrl;

  @Input()
  user;
  company;

  @Output()
  destroy = new EventEmitter<JobListing>();
  private updateUserForm: FormGroup;

  constructor(private userService: UserService,
              private companyService: CompanyService,
              private httpClient: HttpClient,
              private location: Location,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.updateUserForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      companyName: ['', Validators.required],
      companyStreet: ['', Validators.required],
      companyZIP: ['', Validators.required],
      companyCity: ['', Validators.required],
      companyPhone: ['', Validators.required],
      companyPerson: ['', Validators.required],
      companyWebpage: ['', Validators.required]
    });
      console.log('UserId: ' + this.route.snapshot.paramMap.get('id'));
    this.updateUser();
  }

  updateUser() {
    this.userService.getById(parseInt(this.route.snapshot.paramMap.get('id')))
        .subscribe(user => this.user = user);

    this.companyService.getJob(parseInt(this.route.snapshot.paramMap.get('id')))
        .subscribe( company => this.company = company);
  }
}
