import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobListing} from '../models/joblisting';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JoblistingService} from './joblisting.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-joblisting',
  templateUrl: './joblisting.component.html',
  styleUrls: ['./joblisting.component.css'],
  providers: [JoblistingService]
})
export class JoblistingComponent implements OnInit {
  jobListingList: JobListing[] = [];

  baseUrl;

  @Input()
  joblisting: JobListing;

  @Output()
  destroy = new EventEmitter<JobListing>();

  constructor(private joblistingService: JoblistingService,
              private httpClient: HttpClient,
              private location: Location,
              private route: ActivatedRoute) {
    this.baseUrl = environment.baseUrl;
    this.route.params.subscribe(params => this.jobListingList = params.id);
  }
/*Calls getJob() method automatically when visiting component*/
  ngOnInit(): void {
    this.getJob();
  }
/*Calls getJob() method of joblistingService and puts joblisting date into an array*/
  getJob(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.joblistingService.getJob(id)
      .subscribe(job => this.joblisting = job);
  }
  /*Returns to previously visited subsite*/
  goBack(): void {
    this.location.back();
  }
}
