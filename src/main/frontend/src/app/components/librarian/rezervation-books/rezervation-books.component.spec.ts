import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervationBooksComponent } from './rezervation-books.component';

describe('RezervationBooksComponent', () => {
  let component: RezervationBooksComponent;
  let fixture: ComponentFixture<RezervationBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezervationBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezervationBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
