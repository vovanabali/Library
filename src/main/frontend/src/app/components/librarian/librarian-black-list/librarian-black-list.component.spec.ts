import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianBlackListComponent } from './librarian-black-list.component';

describe('LibrarianBlackListComponent', () => {
  let component: LibrarianBlackListComponent;
  let fixture: ComponentFixture<LibrarianBlackListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarianBlackListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianBlackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
