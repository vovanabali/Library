import {Component, OnInit} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {Router} from '@angular/router';
import {BookService} from '../../../services/book.service';
import {Book} from '../../../domains/book';
import {routes} from "../../../app.routes";

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css']
})
export class UserBooksComponent implements OnInit {
  selectBook = new Book();
  books: Book[];
  cols: any[];
  msgs: Message[] = [];
  loading: boolean;
  totalRecords: number;
  name = '';

  constructor(private bookService: BookService, private router: Router, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'name', header: 'Название'},
      {field: 'author', header: 'Автор'},
      {field: 'genre', header: 'Жанр'},
      {field: 'releaseDate', header: 'Дата релиза'}
    ];
    /*this.bookService.getCount().subscribe(count => this.totalRecords = count);*/
    this.loading = true;
  }

  loadBooksLazy(event: LazyLoadEvent) {
    this.loading = true;
    this.bookService.getCountByName('').subscribe((count) => this.totalRecords = count);
    this.bookService.slice(0, 20, '', 1, '').subscribe(books => {
      this.books = books;
      this.loading = false;
    });
  }

  bookInfo(id: number): void {
    const isNavigate = this.router.navigate(['book', id]);
    if (!isNavigate) {
      console.log('Navigate error');
    }
  }
}
