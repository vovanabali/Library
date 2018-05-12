import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkWithTypeOfIssuedComponent } from './work-with-type-of-issued.component';

describe('WorkWithTypeOfIssuedComponent', () => {
  let component: WorkWithTypeOfIssuedComponent;
  let fixture: ComponentFixture<WorkWithTypeOfIssuedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkWithTypeOfIssuedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkWithTypeOfIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
