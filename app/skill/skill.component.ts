import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Skill} from '../skill';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

    baseUrl;
  @Input()
  skill: Skill;

  @Output()
  destroy = new EventEmitter<Skill>();

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
      this.baseUrl = environment.baseUrl;
  }
    onSave() {
        this.httpClient.put(this.baseUrl + '/skill/' + this.skill.id, {
            'name': this.skill.name,
            'jobListingId': this.skill.jobListingId,
        }).subscribe();
    }

    onDestroy() {
        this.httpClient.delete(this.baseUrl + '/skill/' + this.skill.id).subscribe(() => {
            this.destroy.emit(this.skill);
        });
    }
}
