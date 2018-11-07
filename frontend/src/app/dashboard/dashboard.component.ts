import {Component, Input, OnInit} from '@angular/core';
import {JobListing} from '../joblisting';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {


  constructor() {}

  ngOnInit() {

  }

}
