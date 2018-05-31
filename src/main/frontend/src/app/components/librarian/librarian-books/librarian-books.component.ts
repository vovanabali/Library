///<reference path="../../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, Message} from "primeng/api";
import {Book} from "../../../domains/book";
import {Router} from "@angular/router";
import {BookService} from "../../../services/book.service";
import {Extradition} from "../../../domains/extradition";

@Component({
  selector: 'app-librarian-books',
  templateUrl: './librarian-books.component.html',
  styleUrls: ['./librarian-books.component.css']
})
export class LibrarianBooksComponent implements OnInit, OnDestroy  {

  selectBook: Book[] = [];
  books: Book[];
  cols: any[];
  msgs: Message[] = [];
  loading: boolean;
  totalRecords: number;
  name = '';
  extradition = new Extradition();

  constructor(private bookService: BookService,
              private router: Router,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.extradition = JSON.parse(localStorage.getItem('extradition'));
    this.cols = [
      {field: 'name', header: 'Название'},
      {field: 'author', header: 'Автор'},
      {field: 'genre', header: 'Жанр'}
    ];
    this.bookService.getCount().subscribe(count => this.totalRecords = count);
    this.loading = true;
  }


  loadBooksLazy(event: LazyLoadEvent) {
    this.loading = true;
    this.bookService.getCountByName( event.globalFilter).subscribe((count) => this.totalRecords = count);
    this.bookService.slice(event.first / event.rows, event.rows, event.sortField, event.sortOrder, event.globalFilter).subscribe(books => {
      this.books = books;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    localStorage.setItem('extradition', JSON.stringify(this.extradition));
  }
}
