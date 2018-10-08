import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobListing} from '../joblisting';
import {Skill} from '../skill';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TodoItem} from '../todo-item';



@Component({
  selector: 'app-joblisting',
  templateUrl: './joblisting.component.html',
  styleUrls: ['./joblisting.component.css']
})
export class JoblistingComponent implements OnInit {

    @Input()
    joblisting: JobListing;
    skill: Skill = new Skill(null, null, null);
    necessarySkillList: Skill[] = [];

    @Output()
    destroy = new EventEmitter<JobListing>();

    constructor(private httpClient: HttpClient) {
    }

    ngOnInit() {
        this.httpClient.get('http://localhost:3000/skill', {
            params:  new HttpParams().set('jobListingId', '' + this.joblisting.id)
        }).subscribe((instances: any) => {
            this.necessarySkillList = instances.map((instance) => new Skill(instance.id, instance.jobListingId, instance.name));
        });
    }

    onSave() {
        this.httpClient.put('http://localhost:3000/joblisting/' + this.joblisting.id, {
            'title': this.joblisting.title,
            'description': this.joblisting.description
        }).subscribe();
    }

    onDestroy() {
        this.httpClient.delete('http://localhost:3000/joblisting/' + this.joblisting.id).subscribe(() => {
            this.destroy.emit(this.joblisting);
        });
    }

    onNecessarySkillCreate() {
        this.httpClient.post('http://localhost:3000/skill', {
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
