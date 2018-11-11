import { Component, OnInit } from '@angular/core';
import { JoblistingService} from '../joblisting/joblisting.service';
import { Observable} from 'rxjs';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-joblistdetail',
  templateUrl: './joblistdetail.component.html',
  styleUrls: ['./joblistdetail.component.css']
})
export class JoblistdetailComponent implements OnInit {

  //job$;

  constructor(/*private job: JoblistingService, private route: ActivatedRoute */) {
    /*this.route.params.subscribe( params => this.job$ = params.id );*/
  }

  ngOnInit() {
   /* this.job.getJob(this.job$).subscribe(
      job => this.job$ = job
    );*/
  }

}
