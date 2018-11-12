import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, first, map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Skill} from '../skill';
import {JobListing} from '../joblisting';
import {User} from '../login/user.model';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  baseUrl;

  @Input()
  joblistingList: JobListing[];
  userList: User[] = [];

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  ngOnInit() {
    this.httpClient.get(this.baseUrl + '/admin', {withCredentials: true})
        .pipe(first())
        .subscribe((instances: any) => {
          this.joblistingList = instances.map((instance) => new JobListing( null,
              'title',
              'description',
              false,
              null,
              0,
              0,
              0,
              null,
              'contactPerson',
              'contactPhone',
              'contactEmail'));
        });

  }

}
