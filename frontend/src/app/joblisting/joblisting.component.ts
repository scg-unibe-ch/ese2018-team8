import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobListing} from '../models/joblisting';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JoblistingService} from './joblisting.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ApplyingformGenerator} from './applyingform.generator';
import {CompanyService} from '../company/company.service';
import {Company} from '../models/company';

@Component({
  selector: 'app-joblisting',
  templateUrl: './joblisting.component.html',
  styleUrls: ['./joblisting.component.css'],
  providers: [JoblistingService]
})
export class JoblistingComponent implements OnInit {
  jobListingList: JobListing[] = [];
  companyList: Company[] = [];
  baseUrl;

  @Input()
  joblisting: JobListing;

  @Output()
  destroy = new EventEmitter<JobListing>();

  constructor(private joblistingService: JoblistingService,
              private httpClient: HttpClient,
              private location: Location,
              private route: ActivatedRoute,
              private companyService: CompanyService) {
    this.baseUrl = environment.baseUrl;
    this.route.params.subscribe(params => this.jobListingList = params.id);
  }

/*Calls getJob() method automatically when loading this component*/
  ngOnInit(): void {
    this.getJob();
  }

/*Calls getJob() method of joblistingService and puts joblisting data into an array*/
  getJob(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.joblistingService.getJob(id)
      .subscribe(job => this.joblisting = job);
  }

  getApplyingForm(joblisting: JobListing) {
    this.companyService.getCompanyData()
        .subscribe(companies => this.companyList = companies);

    // this.company = this.companyList.find();
    const generator = new ApplyingformGenerator();

    const doc = generator.createForm(joblisting.title, joblisting.companyId);
  }

  /*Returns to a previously visited subsite*/
  goBack(): void {
    this.location.back();
  }

}

