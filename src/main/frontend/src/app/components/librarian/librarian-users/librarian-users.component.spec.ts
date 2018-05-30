import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianUsersComponent } from './librarian-users.component';

describe('LibrarianUsersComponent', () => {
  let component: LibrarianUsersComponent;
  let fixture: ComponentFixture<LibrarianUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarianUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
