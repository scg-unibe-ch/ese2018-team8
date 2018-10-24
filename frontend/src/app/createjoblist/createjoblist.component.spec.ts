import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatejoblistComponent } from './createjoblist.component';

describe('CreatejoblistComponent', () => {
  let component: CreatejoblistComponent;
  let fixture: ComponentFixture<CreatejoblistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatejoblistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatejoblistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
