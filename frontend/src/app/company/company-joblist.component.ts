import { Component, OnInit, Input } from '@angular/core';
import { CompanyService} from './company.service';
import { HttpClient} from '@angular/common/http';
import { Location} from '@angular/common';
import { ActivatedRoute} from '@angular/router';
import { JobListing} from '../models/joblisting';
import { environment} from '../../environments/environment';


@Component({
  selector: 'app-company-joblist',
  templateUrl: './company-joblist.component.html',
  styleUrls: ['./company-joblist.component.css'],
  providers: [CompanyService]
})
export class CompanyJoblistComponent implements OnInit {
  jobListingList: JobListing[];
  baseUrl;

  constructor(private companyService: CompanyService,
              private http: HttpClient,
              private location: Location,
              private route: ActivatedRoute) {}

  getJobs() {
    this.companyService.getJobs()
      .subscribe( jobs => {
        this.jobListingList = jobs;
        console.log('Data from companyService:' + this.jobListingList);
      });
  }
  ngOnInit(
    baseUrl = environment.baseUrl
  ) {
    this.getJobs();
  }

}
