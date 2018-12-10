import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobListing} from '../models/joblisting';
import {Skill} from '../models/skill';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  ngOnInit(): void {
    this.getJob();
  }

  getJob(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.joblistingService.getJob(id)
      .subscribe(job => this.joblisting = job);
  }

  goBack(): void {
    this.location.back();
  }

  getApplyingForm(joblisting: JobListing) {
    this.companyService.getCompanyData()
        .subscribe(companies => this.companyList = companies);

    // this.company = this.companyList.find();
    const generator = new ApplyingformGenerator();

    const doc = generator.createForm(joblisting.title, joblisting.companyId);

  }

}

