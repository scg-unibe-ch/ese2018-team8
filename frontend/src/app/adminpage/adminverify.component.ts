import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
import {ModalManager} from 'ngb-modal';

@Component({
  selector: 'app-adminverify',
  templateUrl: './adminverify.component.html',
  providers: [AdminService]
})
export class AdminVerifyComponent implements OnInit {

  refuseWhat = '';

  jobListingList: JobListing[] = [];
  userList: User[] = [];
  companyList: Company[] = [];

  joblisting = new JobListing(null, '', '', '', false, '', 0,
      0, 0, null, 0, '', '', '');
  user = new User(null, '', '', '', '', false);
  company = new Company(null, '', '', '', '',
      '', '', '', '');

  @Output()
  destroy = new EventEmitter<JobListing>();

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.getCompanies();
    this.getJobs();
  }

  getJobs() {
    this.adminService.getInValidatedJoblistings()
        .subscribe(job =>
            this.jobListingList = job.filter(this.isNotVerified));
  }

  getUsers() {
    this.adminService.getInValidatedUsers()
        .subscribe(async user =>
            this.userList = await user.filter(this.isNotVerified));
  }

  getCompanies() {
    this.adminService.getCompanyData()
        .subscribe( companies =>
            this.companyList = companies);
  }

  getUsersCompany(id: number) {
    return this.companyList.find(company => company.userId === id);
  }

  setJoblistingVerified(job: JobListing) {
    this.adminService.setJobVerified(job.id)
        .subscribe(jobs => this.jobListingList);
    const index = this.jobListingList.indexOf(job, 0);
    this.jobListingList.splice(index, 1);
  }


  setJoblistingRefusedDialog(job: JobListing) {
    this.joblisting = job;
    this.refuseWhat = 'joblisting';
  }

  setJoblistingRefused(reason: string) {
    this.refuseWhat = '';
    this.adminService.setJobRefused(this.joblisting.id, reason)
        .subscribe(job => this.jobListingList);
    const index = this.jobListingList.indexOf(this.joblisting, 0);
    this.jobListingList.splice(index, 1);
  }

  setUserVerified(user: User) {
    this.adminService.setUserVerified(user.id)
        .subscribe( users => this.userList);
    const index = this.userList.indexOf(user, 0);
    this.userList.splice(index, 1);
  }

  setUserRefusedDialog(user: User) {
    this.user = user;
    this.refuseWhat = 'user';
  }

  setUserRefused(reason: string) {
    console.log(this.user);
    this.refuseWhat = '';
    this.adminService.setUserRefused(this.user.id, reason)
        .subscribe(user => this.userList);
    const index = this.userList.indexOf(this.user, 0);
    this.userList.splice(index, 1);
  }

  cancelRefusingJob() {
    this.refuseWhat = '';
  }

  cancelRefusingUser() {
    this.refuseWhat = '';
  }

  isNotVerified(item, index, array) {
    if (! item.isVerified && ! item.isUpdatedByAdmin) {
      return item;
    }
  }
}
