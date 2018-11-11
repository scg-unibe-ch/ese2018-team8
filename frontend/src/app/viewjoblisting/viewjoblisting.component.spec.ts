import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJoblistingComponent } from './view-joblisting.component';

describe('ViewJoblistingComponent', () => {
  let component: ViewJoblistingComponent;
  let fixture: ComponentFixture<ViewJoblistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewJoblistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJoblistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
