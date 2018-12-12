import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from '../../environments/environment';
import {JobListing} from '../models/joblisting';
import {User} from '../models/user';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from './admin.service';
import {Company} from '../models/company';

/**
 * AdminAll component provides services to admin user, where he/she can delete joblistings and users.
 */
@Component({
  selector: 'app-adminall',
  templateUrl: './adminall.component.html',
  providers: [AdminService]
})
export class AdminAllComponent implements OnInit {
  jobListingList: JobListing[] = [];
  userList: User[] = [];
  companyList: Company[] = [];

  company = new Company(null, '', '', '', '',
      '', '', '', '');

  baseUrl = environment.baseUrl;

  @Input()
  joblisting: JobListing;
  user: User;

  @Output()
  destroy = new EventEmitter<JobListing>();

  constructor(private adminService: AdminService,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.jobListingList = params.id);
  }


  /**
   * Get users and joblistings. Get companies in order to be able to display company data of
   * a specific user such that admin user knows to which company a unverified user belongs to.
   */
  ngOnInit(): void {
    this.getUsers();
    this.getCompanies();
    this.getJobs();
  }

  /**
   * Get joblistings, get request is handled in admin service.
   */
  getJobs() {
    this.adminService.getAllJoblistings()
        .subscribe(jobs =>
            this.jobListingList = jobs);
  }

  /**
   * Get users, get request is handled in admin service.
   */
  getUsers() {
    this.adminService.getAllUsers()
        .subscribe(users =>
            this.userList = users);
  }

  /**
   * Get companies, get request is handled in admin service.
   * Company name is needed in HTML for information purpose.
   */
  getCompanies() {
    this.adminService.getCompanyData()
        .subscribe( company =>
            this.companyList = company);
  }

  /**
   * Get company name of a specific user.
   * @param id - user id
   */
  getUsersCompany(id: number) {
    return this.companyList.find(company => company.userId === id);
  }

  /**
   * Delete joblisting.
   * @param job
   */
  deleteJob(job: JobListing) {
    this.adminService.deleteJob(job.id)
        .subscribe(jobs => this.jobListingList);
    const index = this.jobListingList.indexOf(job, 0);
    this.jobListingList.splice(index, 1);
  }

  /**
   * Delete user.
   * @param user
   */
  deleteUser(user: User) {
    this.adminService.deleteUser(user.id)
        .subscribe(users => this.userList);
    const index = this.userList.indexOf(user, 0);
    this.userList.splice(index, 1);
  }

}
