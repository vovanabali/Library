import { Component, OnInit } from '@angular/core';
import {ConfirmationService, LazyLoadEvent, Message} from "primeng/api";
import {IssuedBooks} from "../../../domains/issued-books";
import {Router} from "@angular/router";
import {IssuedBookService} from "../../../services/issued-book.service";

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
    this.issuedBookService.getSlice(event.first / event.rows, event.rows, event.sortField, event.sortOrder).subscribe((issuedBooks) => {
      this.issuedBooks = issuedBooks;
      this.issuedBooks.forEach((issuedBook) => {
        issuedBook.timeOfIssue = new Date(issuedBook.timeOfIssue);
        issuedBook.returnTime = new Date(issuedBook.returnTime);
        console.log(issuedBook);
      });
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

  getDate(timestemp: number) {
    return new Date(timestemp).toLocaleDateString("ru-RU") !== '01.01.1970' ? new Date(timestemp).toLocaleDateString("ru-RU") : '-';
  }

  returnBook(id: number): void {
    this.issuedBookService.returnBook(id).subscribe(value => {
      this.msgs = value ? [{severity: 'success', summary: 'Успех', detail: 'Вы вернули книгу на склад'}] : [{severity: 'error', summary: 'Провал', detail: 'Не удалось венуть книгу на склад'}];
    });
  }
}
