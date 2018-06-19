import {Component, OnInit} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {IssuedBooks} from '../../../domains/issued-books';
import {IssuedBookService} from '../../../services/issued-book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-issued-books-admin',
  templateUrl: './issued-books-admin.component.html',
  styleUrls: ['./issued-books-admin.component.css']
})
export class IssuedBooksAdminComponent implements OnInit {
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
      {field: 'typeOfIssue', header: 'Тип выдачи'},
      {field: 'returnTime', header: 'Дата возврата'}
    ];
    this.issuedBookService.getCountIssuedBooks().subscribe((count) => this.totalRecords = count);
    this.loading = true;
  }

  lazyLoad(event: LazyLoadEvent): void {
    this.loading = true;
    console.log(event.globalFilter);
    this.issuedBookService.getSlice(event.first / event.rows, event.rows, event.sortField, event.sortOrder, event.globalFilter).subscribe((issuedBooks) => {
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

  delete(id: number): void {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить эту запись?',
      header: 'Подтверждение',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.issuedBookService.deleteIssuedBookById(id).subscribe((result) => {
          if (result) {
            this.selectIssuedBook = new IssuedBooks();
            this.msgs = [{severity: 'success', summary: 'Успех', detail: 'Запись была успешно удалена!'}];
          } else {
            this.msgs = [{severity: 'error', summary: 'Провал', detail: 'Не удалось удалить запись!'}];
          }
        });
      }
    });
  }

  getDate(timestemp: number) {
    return new Date(timestemp).toLocaleDateString("ru-RU");
  }
}
