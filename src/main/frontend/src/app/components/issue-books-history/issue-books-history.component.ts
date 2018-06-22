import {Component, OnInit} from '@angular/core';
import {IssuedBooks} from "../../domains/issued-books";
import {LazyLoadEvent, Message} from "primeng/api";
import {IssuedBookService} from "../../services/issued-book.service";

@Component({
  selector: 'app-issue-books-history',
  templateUrl: './issue-books-history.component.html',
  styleUrls: ['./issue-books-history.component.css']
})
export class IssueBooksHistoryComponent implements OnInit {
  issuedBooks: IssuedBooks[];
  selectIssuedBook: IssuedBooks;
  cols: any[];
  msgs: Message[] = [];
  loading: boolean;
  totalRecords: number;

  constructor(private issuedBookService: IssuedBookService) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'persona', header: 'Логин'},
      {field: 'bookInStock', header: 'Книга'},
      {field: 'timeOfIssue', header: 'Дата выдачи'},
      {field: 'typeOfIssue', header: 'Тип выдачи'},
      {field: 'returnTime', header: 'Дата возврата'}
    ];
    this.issuedBookService.getCountIssuedBooks().subscribe((count) => this.totalRecords = count);
    this.loading = true;
  }

  lazyLoad(event: LazyLoadEvent): void {
    this.loading = true;
    console.log(event.globalFilter);
    this.issuedBookService.getSliceHistory(event.first / event.rows, event.rows, event.sortField, event.sortOrder, event.globalFilter).subscribe((issuedBooks) => {
      this.issuedBooks = issuedBooks;
      this.loading = false;
    });
  }


  getDate(timestemp) {
    if (typeof timestemp === 'number') return new Date(timestemp).toLocaleDateString("ru-RU");
    return new Date(timestemp[0], timestemp[1] - 1 , timestemp[2]).toLocaleDateString("ru-RU");
  }

}
