import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../login/login.authservice';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  isLoggedIn: Observable<boolean>;
  isAdmin: Observable<boolean>;
    isBusinessUser: Observable<boolean>;

  constructor(public authService: AuthenticationService) {
    // this.authService.logout();
    this.isLoggedIn = authService.isLoggedIn();
    this.isAdmin = authService.isAdmin();
    this.isBusinessUser = authService.isBusinessUser();
  }

  ngOnInit() {
  }

}
