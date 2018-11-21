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

@Component({
  selector: 'app-adminall',
  templateUrl: './adminall.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminService]
})
export class AdminAllComponent implements OnInit {
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
              private joblistingService: JoblistingService,
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
    this.adminService.getAllJoblistings()
        .subscribe(jobs =>
            this.jobListingList = jobs);
  }

  getUsers() {
    this.adminService.getAllUsers()
        .subscribe(users =>
            this.userList = users);
  }

  updateJob(job: JobListing) {
    this.joblistingService.getJob(job.id)
        .subscribe(job =>
            this.jobListingList);
  }

  deleteJob(job: JobListing) {
    this.adminService.setJobRefused(job.id);
    const index = this.jobListingList.indexOf(job, 0);
    this.jobListingList.splice(index, 1);
  }

  updateUser(user: User) {
    this.userService.getById(user.id)
        .subscribe(job => this.userList);
  }

  deleteUser(user: User) {
    this.adminService.setJobRefused(user.id);
    const index = this.userList.indexOf(user, 0);
    this.jobListingList.splice(index, 1);
  }

}
