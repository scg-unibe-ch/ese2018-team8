import { Component, OnInit, Input } from '@angular/core';
import { CompanyService} from './company.service';
import { Location} from '@angular/common';
import { JobListing} from '../models/joblisting';
import { environment} from '../../environments/environment';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../company/dialog/dialog.component';


@Component({
  selector: 'app-company-joblist',
  templateUrl: './company-joblist.component.html',
  styleUrls: ['./company-joblist.component.css'],
  providers: [CompanyService]
})
export class CompanyJoblistComponent implements OnInit {
  jobListingList: JobListing[];
  baseUrl;

  @Input() joblisting: JobListing;
  constructor(private companyService: CompanyService,
              private location: Location,
              private dialog: MatDialog) {}

  /*Calls getJob() method automatically when loading this component
  * Checks indirectly if user is logged in by current location to
  * baseUrl*/
  ngOnInit(baseUrl = environment.baseUrl) {
    this.getJobs();
  }

  openDialogdelete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: 'Möchten Sie dieses Inserat wirklich löschen?'
    });
  }

  getJobs() {
    this.companyService.getJobs()
      .subscribe( jobs => {
        this.jobListingList = jobs;
        console.log('Data from companyService:' + this.jobListingList);
      });
  }

  delete(job: JobListing): void {
    this.companyService.deleteJob(job.id).subscribe(() => {
        const index = this.jobListingList.indexOf(job, 0);
        this.jobListingList.splice(index, 1);
    });
  }
  /*Returns to a previously visited subsite*/
  goBack(): void {
    this.location.back();
  }
}
