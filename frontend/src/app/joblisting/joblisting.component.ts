import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobListing} from '../models/joblisting';
import {Skill} from '../models/skill';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JoblistingService} from './joblisting.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-joblisting',
  templateUrl: './joblisting.component.html',
  styleUrls: ['./joblisting.component.css'],
  providers: [JoblistingService]
})
export class JoblistingComponent implements OnInit {
  jobListingList: JobListing[] = [];

  baseUrl;

  @Input()
  joblisting: JobListing;
  skill: Skill = new Skill(null, null, null);
  necessarySkillList: Skill[] = [];

  @Output()
  destroy = new EventEmitter<JobListing>();

  constructor(private joblistingService: JoblistingService,
              private httpClient: HttpClient,
              private location: Location,
              private route: ActivatedRoute) {
    this.baseUrl = environment.baseUrl;
    this.route.params.subscribe( params => this.jobListingList = params.id);
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
    /*this.httpClient.get(this.baseUrl + '/joblisting').subscribe((instances: any) => {
      this.jobListingList = instances.map((instance) => new JobListing(
        instance.id,
        instance.title,
        instance.description,
        instance.isVerified,
        instance.brancheId,
        instance.jobPensumFrom,
        instance.jobPensumTo,
        instance.payment,
        instance.companyId,
        instance.contactPerson,
        instance.contactPhone,
        instance.contactEmail)
      );
    });*/

    // this.httpClient.get(this.baseUrl + '/skill', {
    //    params:  new HttpParams().set('jobListingId', '' + this.joblisting.id)
    // })
    /*this.httpClient.get(this.baseUrl + '/joblisting', {withCredentials: true})
      .subscribe((instances: any) => {
        this.necessarySkillList = instances.map((instance) => new Skill(instance.id, instance.jobListingId, instance.name));
      });
*/



 /* onSave() {
        this.httpClient.put(this.baseUrl + '/joblisting/' + this.joblisting.id, {
            'title': this.joblisting.title,
            'description': this.joblisting.description
        }).subscribe();
    }

    onDestroy() {
        this.httpClient.delete(this.baseUrl + '/joblisting/' + this.joblisting.id).subscribe(() => {
            this.destroy.emit(this.joblisting);
        });
    }

  onNecessarySkillCreate() {
    this.httpClient.post(this.baseUrl + '/skill', {
      'name': this.skill.name,
      'jobListingId': this.joblisting.id
    }).subscribe((instance: any) => {
      this.skill.id = instance.id;
      this.necessarySkillList.push(this.skill);
      this.skill = new Skill(null, this.joblisting.id, null);
    });
  }

    onNecessarySkillDestroy(skill: Skill) {
        this.necessarySkillList.splice(this.necessarySkillList.indexOf(skill), 1);
    }*/
}

