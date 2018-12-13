import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { JobListing} from '../../models/joblisting';
import {CompanyService} from '../company.service';
import {environment} from '../../../environments/environment';
/*import { AdminService} from '../admin.service';*/

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  jobListingList: JobListing[];
  joblisting: JobListing;
  baseUrl;
  constructor(public thisDialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private companyService: CompanyService) { }

  /*Calls getJobs() method when visiting component*/
  ngOnInit(baseUrl = environment.baseUrl) {
    this.getJobs();
  }

  onClosed() {
    this.thisDialogRef.close();
  }

  getJobs() {
    this.companyService.getJobs()
      .subscribe( jobs => {
        this.jobListingList = jobs;
        console.log('Data from companyService:' + this.jobListingList);
      });
  }

  /*Delete method for Company-joblistComponent*/
  delete(job: JobListing): void {
    this.companyService.deleteJob(job.id).subscribe(() => {
      const index = this.jobListingList.indexOf(job, 0);
      this.jobListingList.splice(index, 1);
      this.onClosed();
    });
  }
}
