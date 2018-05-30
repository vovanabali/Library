import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianBooksComponent } from './librarian-books.component';

describe('LibrarianBooksComponent', () => {
  let component: LibrarianBooksComponent;
  let fixture: ComponentFixture<LibrarianBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarianBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
