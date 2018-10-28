import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoblistdetailComponent } from './joblistdetail.component';

describe('JoblistdetailComponent', () => {
  let component: JoblistdetailComponent;
  let fixture: ComponentFixture<JoblistdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoblistdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoblistdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
