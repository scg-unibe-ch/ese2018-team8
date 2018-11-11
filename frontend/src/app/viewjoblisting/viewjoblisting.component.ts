import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-view-joblisting',
  templateUrl: './view-joblisting.component.html',
  styleUrls: ['./view-joblisting.component.css']
})
export class ViewJoblistingComponent implements OnInit {

  constructor() {
  }

  ngOnInit(
    baseUrl = environment.baseUrl
  ) {

  }

}
