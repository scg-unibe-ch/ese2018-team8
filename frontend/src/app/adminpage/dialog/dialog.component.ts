import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { JobListing} from '../../models/joblisting';
/*import { AdminService} from '../admin.service';*/

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  joblisting = new JobListing(null, '', '', '', false, '', 0,
    0, 0, null, 0, '', '', '');

 /* jobListingList: JobListing[] = [];*/

  refuseWhat = '';

  constructor(public thisDialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string
             /* private adminService: AdminService*/) { }

  ngOnInit() {
  }

  onClosed() {
    this.thisDialogRef.close();
  }


  setJoblistingRefusedDialog(job: JobListing) {
    this.joblisting = job;
    this.refuseWhat = 'joblisting';
  }

 /* setJoblistingVerified(job: JobListing) {
    this.adminService.setJobVerified(job.id)
      .subscribe(jobs => this.jobListingList);
    const index = this.jobListingList.indexOf(job, 0);
    this.jobListingList.splice(index, 1);
  }*/

}
