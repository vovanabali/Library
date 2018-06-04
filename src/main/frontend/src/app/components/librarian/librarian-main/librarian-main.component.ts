import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from "@angular/router";
import {Extradition} from "../../../domains/extradition";
import {TypeOfIssue} from "../../../domains/type-of-issue";
import {Persona} from "../../../domains/persona";

@Component({
  selector: 'app-librarian-main',
  templateUrl: './librarian-main.component.html',
  styleUrls: ['./librarian-main.component.css']
})
export class LibrarianMainComponent implements OnInit {
  items: MenuItem[];

  constructor(private router: Router) {
  }

  activeIndex: number = 1;

  ngOnInit() {
    this.items = [{
      label: 'Personal',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
      {
        label: 'Seat',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Payment',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
      {
        label: 'Confirmation',
        command: (event: any) => {
          this.activeIndex = 3;
        }
      }
    ];
    let extradition: Extradition = new Extradition();
    extradition.books = [];
    extradition.typeOfIssue = new TypeOfIssue();
    extradition.user = new Persona();
    localStorage.setItem('extradition', JSON.stringify(extradition));
  }

  isActive(number: number): string {
    return this.activeIndex == number ? 'ui-g-4 ui-sm-12 step active' : 'ui-g-4 ui-sm-12   step';
  }

  goToStep(stepNumber: number): void {
    this.activeIndex = stepNumber;
    switch (stepNumber) {
      case 1:
        this.router.navigate(['librarian', 'books']);
        break;
      case 2:
        this.router.navigate(['librarian', 'users']);
        break;
      case 3:
        this.router.navigate(['librarian', 'issue']);
        break;
    }
  }

  updateRouter(): void {
    let urlTree = this.router.url.split('/');
    switch (urlTree[urlTree.length - 1]) {
      case 'books':
        this.activeIndex = 1;
        break;
      case 'users':
        this.activeIndex = 2;
        break;
      case 'issue':
        this.activeIndex = 3;
        break;
      default:
        this.activeIndex = 0;
        break;
    }
  }
}
