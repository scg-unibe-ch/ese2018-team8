import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobListing} from '../joblisting';
import {Skill} from '../skill';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-joblisting',
  templateUrl: './joblisting.component.html',
  styleUrls: ['./joblisting.component.css']
})
export class JoblistingComponent implements OnInit {

    baseUrl;

    @Input()
    joblisting: JobListing;
    skill: Skill = new Skill(null, null, null);
    necessarySkillList: Skill[] = [];

    @Output()
    destroy = new EventEmitter<JobListing>();

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.baseUrl;
    }

    ngOnInit() {
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
}
