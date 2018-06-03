import {Component, OnInit} from '@angular/core';
import {Extradition} from "../../../domains/extradition";
import {Router} from "@angular/router";
import {ConfirmationService, Message} from "primeng/api";
import {TypeOfIssue} from "../../../domains/type-of-issue";
import {TypeOfIssuedService} from "../../../services/type-of-issued.service";
import {IssueService} from "../../../services/issue.service";
import {BookInStock} from "../../../domains/book-in-stock";
import {DialogModule} from 'primeng/dialog';

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
  showDialog: boolean = false;
  cols: any[];

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

  check(): void {
    this.issuesSrevice.checkBooks(this.extradition).subscribe((value) => {
      this.inStock = value;
    });
  }

  issue(): void {
    console.log(this.extradition);
    this.showDialog = true;
    this.check();
  }
}
