import { Component, OnInit, Input } from '@angular/core';
import { CompanyService} from './company.service';
import { HttpClient} from '@angular/common/http';
import { Location} from '@angular/common';
import { ActivatedRoute} from '@angular/router';
import { JobListing} from '../models/joblisting';
import { environment} from '../../environments/environment';
import {FormGroup} from '@angular/forms';


interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'success',
  message: 'This is an success alert',
}];

@Component({
  selector: 'app-company-edit-job',
  templateUrl: './company-edit-job.component.html',
  styleUrls: ['./company-edit-job.component.css']
})
export class CompanyEditJobComponent implements OnInit {
  jobListingList: JobListing[];
  baseUrl;
  alerts: Alert[];

  @Input() joblisting: JobListing;

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute,
              private location: Location,
              private httpClient: HttpClient) {
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

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.companyService.updateJob(this.joblisting)
      .subscribe(() => this.goBack());
    this.alerts = Array.from(ALERTS);
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  /* Notifications
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!', {
      closeButton: false,
      timeOut: 4000
    });
  }*/
}
