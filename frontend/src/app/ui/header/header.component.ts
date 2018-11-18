import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../login/login.authservice';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: Observable<boolean>;
  isAdmin: boolean;
  user: User;

  constructor(public authService: AuthenticationService) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit() {
  }

}
