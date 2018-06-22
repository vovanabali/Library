import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IssueBooksHistoryComponent} from './issue-books-history.component';

describe('IssueBooksHistoryComponent', () => {
  let component: IssueBooksHistoryComponent;
  let fixture: ComponentFixture<IssueBooksHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueBooksHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueBooksHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
