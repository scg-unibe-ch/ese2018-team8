import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminService} from './admin.service';
import {JobListing} from '../models/joblisting';
import {User} from '../models/user';
import {Company} from '../models/company';
import {ActivatedRoute, Route} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

/**
 * AdminVerify Component enables verification of users and joblistings by admin user.
 */
@Component({
  selector: 'app-adminviewuser',
  templateUrl: './adminviewuser.component.html',
  providers: [AdminService]
})
export class AdminViewUserComponent implements OnInit {

  company = new Company(null, '', '', '', '',
      '', '', '', '');

  baseUrl;
  user;

  @Output()
  destroy = new EventEmitter<JobListing>();

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
    this.route.params.subscribe(params => this.user = params.id);
  }

  /**
   * Get user and companies in order to be able to display company data of
   * a specific user such that admin user can see user's data.
   */
  ngOnInit(): void {
   /* this.getUser();*/
    this.getUserData();
  }

  /**
   * Get user from database for detailed view.


  getUser() {
    const id = +this.route.snapshot.paramMap.get('id');
    const url = `${this.baseUrl}/user/${id}`;
    this.httpClient.get(url)
        .subscribe( (instance: any) => {
        this.user = new User(instance.id,
            instance.email,
            instance.role,
            instance.isVerified);
        });
  }  */

  getUserData() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.httpClient.get(this.baseUrl + '/company/byUserId', {
      params:  new HttpParams().set('userId', '' + id)
    }).subscribe((instance: any) => {
      this.company = new Company(instance.id,
          instance.userId,
          instance.companyName,
          instance.companyStreet,
          instance.companyZIP,
          instance.companyCity,
          instance.companyPhone,
          instance.companyPerson,
          instance.companyWebsite);
    });
  }

}
