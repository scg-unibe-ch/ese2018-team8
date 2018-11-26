import { Component, OnInit, Input } from '@angular/core';
import { CompanyService} from './company.service';
import { HttpClient} from '@angular/common/http';
import { Location} from '@angular/common';
import { ActivatedRoute} from '@angular/router';
import { JobListing} from '../models/joblisting';
import { environment} from '../../environments/environment';


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
  }

}
