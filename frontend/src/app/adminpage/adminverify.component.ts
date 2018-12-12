import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {JobListing} from '../models/joblisting';
import {User} from '../models/user';
import {AdminService} from './admin.service';
import {Company} from '../models/company';

/**
 * AdminVerify Component enables verification of users and joblistings by admin user.
 */
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
      0, 0, null, 0, '', '', '', '', false);
  user = new User(null, '', '', false);
  company = new Company(null, '', '', '', '',
      '', '', '', '');

  @Output()
  destroy = new EventEmitter<JobListing>();

  constructor(private adminService: AdminService) {
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
   * Filtering function sorts out unverified joblistings.
   */
  getJobs() {
    this.adminService.getAllJoblistings()
        .subscribe(job =>
            this.jobListingList = job.filter(this.isNotVerified));
  }

  /**
   * Get users, get request is handled in admin service.
   * Filtering function sorts out unverified users.
   */
  getUsers() {
    this.adminService.getAllUsers()
        .subscribe(async user =>
            this.userList = await user.filter(this.isNotVerified));
  }

  /**
   * Get companies, get request is handled in admin service.
   * Company name is needed in HTML for information purpose.
   */
  getCompanies() {
    this.adminService.getCompanyData()
        .subscribe( companies =>
            this.companyList = companies);
  }

  /**
   * Get company name of a specific user.
   * @param id - user id
   */
  getUsersCompany(id: number) {
    return this.companyList.find(company => company.userId === id);
  }

  /**
   * Set joblisting verified. It will be public afterwards.
   * @param job - joblisting object, where only id is needed.
   */
  setJoblistingVerified(job: JobListing) {
    this.adminService.setJobVerified(job.id)
        .subscribe(jobs => this.jobListingList);
    const index = this.jobListingList.indexOf(job, 0);
    this.jobListingList.splice(index, 1);
  }

  /**
   * Provides dialog for refusing a joblisting. Admin user has then to type in a reason for refusing
   * a joblisting in a text box.
   * @param job
   */
  setJoblistingRefusedDialog(job: JobListing) {
    this.joblisting = job;
    this.refuseWhat = 'joblisting';
  }

  /**
   * After admin user has typed in a reason for refusing a joblisting, the joblisting is refused.
   * Put request is handled in admin service.
   * @param reason
   */
  setJoblistingRefused(reason: string) {
    this.refuseWhat = '';
    this.adminService.setJobRefused(this.joblisting.id, reason)
        .subscribe(job => this.jobListingList);
    const index = this.jobListingList.indexOf(this.joblisting, 0);
    this.jobListingList.splice(index, 1);
  }

  /**
   * Set user verified. User will be able to use his/her account afterwards.
   * @param user - user object, where only id is needed.
   */
  setUserVerified(user: User) {
    this.adminService.setUserVerified(user.id)
        .subscribe( users => this.userList);
    const index = this.userList.indexOf(user, 0);
    this.userList.splice(index, 1);
  }

  /**
   * Provides dialog for refusing a user. Admin user has then to type in a reason for refusing
   * a joblisting in a text box.
   * @param job
   */
  setUserRefusedDialog(user: User) {
    this.user = user;
    this.refuseWhat = 'user';
  }

  /**
   * After admin user has typed in a reason for refusing a user, the user is refused.
   * Corresponding put request is handled in admin service.
   * @param reason
   */
  setUserRefused(reason: string) {
    console.log(this.user);
    this.refuseWhat = '';
    this.adminService.setUserRefused(this.user.id, reason)
        .subscribe(user => this.userList);
    const index = this.userList.indexOf(this.user, 0);
    this.userList.splice(index, 1);
  }

  /**
   * Cancel refusal, dialog is hidden again.
   */
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
