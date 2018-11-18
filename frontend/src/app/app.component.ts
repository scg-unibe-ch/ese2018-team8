import {Component, OnInit} from '@angular/core';
import {User} from './models/user';
import {AdminGuard} from './adminpage/admin.guard';
import {AdminService} from './adminpage/admin.service';
import {UserService} from './login/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor() {}

  ngOnInit() {

  }


}
