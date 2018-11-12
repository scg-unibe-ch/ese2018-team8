import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewjoblistingComponent } from './viewjoblisting.component';

describe('ViewJoblistingComponent', () => {
  let component: ViewjoblistingComponent;
  let fixture: ComponentFixture<ViewjoblistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewjoblistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewjoblistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
