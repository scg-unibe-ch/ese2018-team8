import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JobListing} from '../models/joblisting';
import {User} from '../models/user';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from './admin.service';
import {UserService} from '../login/user.service';
import {CompanyService} from '../company/company.service';
import {Company} from '../models/company';

@Component({
  selector: 'app-adminverify',
  templateUrl: './adminverify.component.html',
  providers: [AdminService]
})
export class AdminVerifyComponent implements OnInit {
  jobListingList: JobListing[] = [];
  userList: User[] = [];
  companyList: Company[] = [];



  @Input()
  joblisting: JobListing;
  user: User;

  @Output()
  destroy = new EventEmitter<JobListing>();

  constructor(private adminService: AdminService,
              private companyService: CompanyService,
              private router: Router,
              private _location: Location) {
  }

  ngOnInit(): void {
    this.getJobs();
    this.getUsers();
    this.getCompanies();
  }

  getJobs() {
    this.adminService.getInValidatedJoblistings()
        .subscribe(job =>
            this.jobListingList = job.filter(this.isNotVerified));
  }

  getUsers() {
    this.adminService.getInValidatedUsers()
        .subscribe(user =>
            this.userList = user.filter(this.isNotVerified));
  }

  getCompanies() {
    this.adminService.getCompanyData()
        .subscribe( company =>
            this.companyList = company);
  }

  getUsersCompany(id: number) {
    return this.companyList.find(user => user['id'] === userId);
  }

  setJobVerified(job: JobListing) {
    this.adminService.setJobVerified(job.id)
        .subscribe(job => this.jobListingList);
    const index = this.jobListingList.indexOf(job, 0);
    this.jobListingList.splice(index, 1);
  }

  setJobRefusedReason(job: JobListing) {
  }

  setJobRefused(job: JobListing) {
    this.adminService.setJobRefused(job.id);
    const index = this.jobListingList.indexOf(job, 0);
    this.jobListingList.splice(index, 1);
  }

  setUserVerified(user: User) {
    this.adminService.setUserVerified(user.id)
        .subscribe( user => this.userList);
    const index = this.userList.indexOf(user, 0);
    this.userList.splice(index, 1);
  }

  setUserRefusedReason(user: User) {
  }

  setUserRefused(user: User) {
    this.adminService.setUserRefused(user.id);
    const index = this.userList.indexOf(user, 0);
    this.userList.splice(index, 1);
  }

  cancelRefusingJob() {
  }

  cancelRefusingUser() {
  }

  isNotVerified(job, index, array) {
    if (! job.isVerified) {
      return job;
    }
  }
}
