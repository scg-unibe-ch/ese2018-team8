import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JobListing} from '../models/joblisting';
import {User} from '../models/user';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from './admin.service';
import {UserService} from '../login/user.service';

@Component({
  selector: 'app-adminverify',
  templateUrl: './adminverify.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminService]
})
export class AdminVerifyComponent implements OnInit {
  jobListingList: JobListing[] = [];
  userList: User[] = [];

  baseUrl;

  @Input()
  joblisting: JobListing;
  user: User;

  @Output()
  destroy = new EventEmitter<JobListing>();

  constructor(private adminService: AdminService,
              private userService: UserService,
              private httpClient: HttpClient,
              private location: Location,
              private route: ActivatedRoute) {
    this.baseUrl = environment.baseUrl;
    this.route.params.subscribe(params => this.jobListingList = params.id);
  }

  ngOnInit(): void {
    this.getJobs();
    this.getUsers();
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

  setJobVerified(job: JobListing) {
    this.adminService.setJobVerified(job.id)
        .subscribe(job => this.jobListingList);
    const index = this.jobListingList.indexOf(job, 0);
    this.jobListingList.splice(index, 1);
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

  setUserRefused(user: User) {
    this.adminService.setUserRefused(user.id);
    const index = this.userList.indexOf(user, 0);
    this.userList.splice(index, 1);
  }

  isNotVerified(job, index, array) {
    if (! job.isVerified) {
      return job;
    }
  }
}
