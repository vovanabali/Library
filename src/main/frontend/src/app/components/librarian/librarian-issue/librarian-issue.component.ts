import {Component, OnInit} from '@angular/core';
import {Extradition} from "../../../domains/extradition";
import {Router} from "@angular/router";
import {ConfirmationService, Message} from "primeng/api";
import {TypeOfIssue} from "../../../domains/type-of-issue";
import {TypeOfIssuedService} from "../../../services/type-of-issued.service";
import {IssueService} from "../../../services/issue.service";
import {BookInStock} from "../../../domains/book-in-stock";
import {DialogModule} from 'primeng/dialog';
import {Persona} from "../../../domains/persona";

@Component({
  selector: 'app-librarian-issue',
  templateUrl: './librarian-issue.component.html',
  styleUrls: ['./librarian-issue.component.css']
})
export class LibrarianIssueComponent implements OnInit {

  msgs: Message[] = [];
  extradition = new Extradition();
  typesOfIssues: TypeOfIssue[] = [];
  inStock: BookInStock[] = [];
  cols: any[];
  display: boolean = false;

  constructor(private router: Router,
              private confirmationService: ConfirmationService,
              private typeOfIssuesSerive: TypeOfIssuedService,
              private issuesSrevice: IssueService) {
    this.cols = [
      {field: 'rack', header: 'Стелаж'},
      {field: 'rowNumber', header: 'Номер полки'},
      {field: 'inventoryNumber', header: 'Инвентарный номер'},
      {field: 'book', header: 'Книга'}
    ];
    this.extradition = JSON.parse(localStorage.getItem('extradition'));
    this.typeOfIssuesSerive.getTypeOfIssued().subscribe((array: TypeOfIssue[]) => {
      this.typesOfIssues = array;
      this.extradition.typeOfIssue = this.typesOfIssues[0];
    });
  }

  ngOnInit() {

  }

  issue(): void {
    this.issuesSrevice.issue(this.extradition).subscribe(value => {
      this.inStock = value;
      this.display = true;
    });
  }

  confirmIssues(): void {
    this.extradition = new Extradition();
    this.display = false;
    let extradition: Extradition = new Extradition();
    extradition.books = [];
    extradition.typeOfIssue = new TypeOfIssue();
    extradition.user = new Persona();
    localStorage.setItem('extradition', JSON.stringify(extradition));
  }
}
