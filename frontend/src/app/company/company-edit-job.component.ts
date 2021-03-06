import { Component, OnInit, Input } from '@angular/core';
import { CompanyService} from './company.service';
import { Location} from '@angular/common';
import { ActivatedRoute} from '@angular/router';
import { JobListing} from '../models/joblisting';
import { environment} from '../../environments/environment';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-company-edit-job',
  templateUrl: './company-edit-job.component.html',
  styleUrls: ['./company-edit-job.component.css']
})
export class CompanyEditJobComponent implements OnInit {
  jobListingList: JobListing[];
  baseUrl;
  @Input() joblisting: JobListing;

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
       this.baseUrl = environment.baseUrl;
       this.getJob();
   }

   getJob(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.companyService.getJob(id)
      .subscribe(job => this.joblisting = job);
  }

  save(): void {
    this.companyService.updateJob(this.joblisting)
      .subscribe(() => this.goBack());
  }

  /*Returns to a previously visited subsite*/
  goBack(): void {
    this.location.back();
  }
}
