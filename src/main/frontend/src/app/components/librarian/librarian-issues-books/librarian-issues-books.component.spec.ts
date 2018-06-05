import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianIssuesBooksComponent } from './librarian-issues-books.component';

describe('LibrarianIssuesBooksComponent', () => {
  let component: LibrarianIssuesBooksComponent;
  let fixture: ComponentFixture<LibrarianIssuesBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarianIssuesBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianIssuesBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
