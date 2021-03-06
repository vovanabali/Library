import {Component, OnInit} from '@angular/core';
import {Book} from '../../../domains/book';
import {BookService} from '../../../services/book.service';
import {Router} from '@angular/router';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {Extradition} from "../../../domains/extradition";

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css'],
  providers: [ConfirmationService]
})
export class AdminBooksComponent implements OnInit {
  selectBook = new Book();
  books: Book[];
  cols: any[];
  msgs: Message[] = [];
  loading: boolean;
  totalRecords: number;
  name = '';
  extradition = new Extradition();

  constructor(private bookService: BookService, private router: Router, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.extradition = JSON.parse(localStorage.getItem('extradition'));
    this.cols = [
      {field: 'name', header: 'Название'},
      {field: 'author', header: 'Автор'},
      {field: 'genre', header: 'Жанр'},
      {field: 'releaseDate', header: 'Дата релиза'}
    ];
    this.bookService.getCount().subscribe(count => this.totalRecords = count);
    this.loading = true;
  }

  addBook(): void {
    const result = this.router.navigateByUrl('admin/addBook');
    if (result) {
      this.msgs = [{severity: 'error', summary: 'Ошибка', detail: 'Невозможно перейти по ссылке!'}];
    }
  }

  deleteBook(id: number): void {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить эту запись?',
      header: 'Подтверждение',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.bookService.deleteBookById(id).subscribe((result) => {
          if (result) {
            this.selectBook = new Book();
            this.msgs = [{severity: 'success', summary: 'Успех', detail: 'Запись была успешно удалена!'}];
            this.updateBooks();
          } else {
            this.msgs = [{severity: 'error', summary: 'Провал', detail: 'Не удалось удалить запись!'}];
          }
        });
      }
    });
  }

  updateBooks(): void {
    this.bookService.getAllBooks().subscribe(books => this.books = books);
    this.msgs = [{severity: 'success', summary: 'Успех', detail: 'Записи успешно обновлены!'}];
  }

  editEntry(id: number): void {
    if (id != null) {
      const role = JSON.parse(localStorage.getItem('currentUser')).role.name;
      this.router.navigate([role, 'editBook'], {queryParams: {'id': id}});
    }
  }

  loadBooksLazy(event: LazyLoadEvent) {
    this.loading = true;
    this.bookService.getCountByName( event.globalFilter).subscribe((count) => this.totalRecords = count);
    this.bookService.slice(event.first / event.rows, event.rows, event.sortField, event.sortOrder, event.globalFilter).subscribe(books => {
      this.books = books;
      this.loading = false;
    });
  }

  getDate(timestamp) {
    return timestamp ? new Date(timestamp).toLocaleDateString("ru-RU").substring(3,new Date(timestamp).toLocaleDateString("ru-RU").length ) : 'Дата не была указанна';
  }
}
