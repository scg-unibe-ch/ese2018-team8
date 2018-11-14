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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminService]
})
export class AdminComponent implements OnInit {
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

  setJobVerified(id: number) {
    this.adminService.setJobVerified(id)
        .subscribe(job => this.jobListingList);
  }

  setJobRefused(id: number) {
    this.adminService.setJobRefused(id);

  }

  setUserVerified(id: number) {
    this.adminService.setUserVerified(id)
        .subscribe( user => this.userList);

  }

  setUserRefused(id: number) {
    this.adminService.setUserRefused(id);

  }

  isNotVerified(job, index, array) {
    if (! job.isVerified) {
      return job;
    }
  }
}
