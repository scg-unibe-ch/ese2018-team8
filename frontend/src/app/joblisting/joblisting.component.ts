import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobListing} from '../joblisting';
import {Skill} from '../skill';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JoblistingService} from './joblisting.service';

@Component({
  selector: 'app-joblisting',
  templateUrl: './joblisting.component.html',
  styleUrls: ['./joblisting.component.css']
})
export class JoblistingComponent implements OnInit {
  jobListingList: JobListing[] = [];

  constructor(private joblistingService: JoblistingService,
              private httpClient: HttpClient) {}

  @Input()
  joblisting: JobListing;
  skill: Skill = new Skill(null, null, null);
  necessarySkillList: Skill[] = [];

  baseUrl;

  @Output()
  destroy = new EventEmitter<JobListing>();

  ngOnInit() {

    this.getJob();

    this.httpClient.get(this.baseUrl + '/joblisting').subscribe((instances: any) => {
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
    });

    this.httpClient.get(this.baseUrl + '/skill', {
      params:  new HttpParams().set('jobListingId', '' + this.joblisting.id)
    }).subscribe((instances: any) => {
      this.necessarySkillList = instances.map((instance) => new Skill(instance.id, instance.jobListingId, instance.name));
    });

    }

  onSave() {
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
  }

  getJob(): void {
    this.joblistingService.getJobs().subscribe(job => console.log(job));
  }
}
