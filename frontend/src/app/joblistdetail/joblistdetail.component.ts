import { Component, OnInit } from '@angular/core';
import { JoblistingService} from '../joblisting/joblisting.service';
import { Observable} from 'rxjs';
import { ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../login/login.authservice';

@Component({
  selector: 'app-joblistdetail',
  templateUrl: './joblistdetail.component.html',
  styleUrls: ['./joblistdetail.component.css']
})
export class JoblistdetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
