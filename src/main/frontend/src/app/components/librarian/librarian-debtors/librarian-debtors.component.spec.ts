import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianDebtorsComponent } from './librarian-debtors.component';

describe('LibrarianDebtorsComponent', () => {
  let component: LibrarianDebtorsComponent;
  let fixture: ComponentFixture<LibrarianDebtorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarianDebtorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianDebtorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
