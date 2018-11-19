import { Component, OnInit } from '@angular/core';
import { JobListing} from '../models/joblisting';
import { CompanyService} from './company.service';
import {ActivatedRoute} from '@angular/router';
import { Location} from '@angular/common';



@Component({
  selector: 'app-company-edit-job',
  templateUrl: './company-edit-job.component.html',
  styleUrls: ['./company-edit-job.component.css']
})
export class CompanyEditJobComponent implements OnInit {

  joblisting: JobListing;

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
  }

  getJob(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.companyService.getJob(id)
      .subscribe(job => this.joblisting = job);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.companyService.updateJob(this.joblisting)
      .subscribe(() => this.goBack());
  }
}
