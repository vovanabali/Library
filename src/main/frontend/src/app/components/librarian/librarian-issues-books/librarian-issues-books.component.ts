import {Component, OnInit} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, Message} from "primeng/api";
import {IssuedBooks} from "../../../domains/issued-books";
import {Router} from "@angular/router";
import {IssuedBookService} from "../../../services/issued-book.service";
import {isArray} from "util";

@Component({
  selector: 'app-librarian-issues-books',
  templateUrl: './librarian-issues-books.component.html',
  styleUrls: ['./librarian-issues-books.component.css']
})
export class LibrarianIssuesBooksComponent implements OnInit {

  issuedBooks: IssuedBooks[];
  selectIssuedBook: IssuedBooks;
  cols: any[];
  msgs: Message[] = [];
  loading: boolean;
  totalRecords: number;
  name = '';

  constructor(private issuedBookService: IssuedBookService,
              private router: Router,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'persona', header: 'Логин'},
      {field: 'bookInStock', header: 'Книга'},
      {field: 'timeOfIssue', header: 'Дата выдачи'},
      {field: 'typeOfIssue', header: 'Тип выдачи'}
    ];
    this.issuedBookService.getCountIssuedBooks().subscribe((count) => this.totalRecords = count);
    this.loading = true;
  }

  lazyLoad(event: LazyLoadEvent): void {
    this.loading = true;
    console.log(event.globalFilter);
    this.issuedBookService.getSlice(event.first / event.rows, event.rows, event.sortField, event.sortOrder, event.globalFilter).subscribe((issuedBooks) => {
      this.issuedBooks = issuedBooks;
      this.loading = false;
    });
  }

  editEntry(id: number): void {
    if (id != null) {
      const isNavigate = this.router.navigate(['admin/editIssuedBook'], {queryParams: {'id': id}});
      if (!isNavigate) {
        this.msgs = [{severity: 'error', summary: 'Провал', detail: 'Не открыть запись на редактирование!'}];
      }
    }
  }

  getDate(timestemp: any) {
    if (isArray(timestemp)) {
      return new Date(timestemp[0] , timestemp[1] - 1 , timestemp[2]).toLocaleDateString("ru-RU");
    } else {
      return new Date(timestemp).toLocaleDateString("ru-RU") !== '01.01.1970' ? new Date(timestemp).toLocaleDateString("ru-RU") : '-';
    }
  }

  returnBook(id: number): void {
    this.issuedBookService.returnBook(id).subscribe(value => {
      this.issuedBooks.splice(this.issuedBooks.indexOf(this.issuedBooks.find(value1 => value1.id === id)), 1);
      this.msgs = value ? [{severity: 'success', summary: 'Успех', detail: 'Вы вернули книгу на склад'}] : [{severity: 'error', summary: 'Провал', detail: 'Не удалось венуть книгу на склад'}];
    });
  }

  getDateNowOfFromTimestamp(timestamp) {
    return timestamp ? new Date(timestamp) : new Date();
  }

  isBadUserBook(book) {
    console.log(book);
    if (new Date(book.issueUpTo) < new Date()) {
      return {'background-color': 'rgba(255, 0, 0, 10)'};
    }
    return {};
  }
}
