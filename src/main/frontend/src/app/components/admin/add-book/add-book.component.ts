import {Component, OnInit} from '@angular/core';
import {Genre} from '../../../domains/genre';
import {Author} from '../../../domains/author';
import {AuthorService} from '../../../services/author.service';
import {GenreService} from '../../../services/genre.service';
import {Book} from '../../../domains/book';
import {BookService} from '../../../services/book.service';
import {Message} from 'primeng/components/common/api';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book = new Book();
  genres: Genre[];
  authors: Author[];
  msgs: Message[] = [];

  constructor(private authorService: AuthorService,
              private genreService: GenreService,
              private bookService: BookService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(param => {
      const bookId = param['id'];
      if (this.activeRoute.snapshot.routeConfig.path === 'editBook') {
        if (bookId == null) {
          this.router.navigate(['admin', 'addBook']);
        } else {
          this.bookService.getBookById(bookId).subscribe(book => {
            this.book = book;
            this.book.author.FIO = book.author.surname + ' ' + book.author.name + ' ' + book.author.patronymic;
            this.book.releaseDate = new Date(book.releaseDate);
          });
        }
        document.getElementById('saveButton').style.display = 'block';
      } else {
        document.getElementById('addButton').style.display = 'block';
      }
    });
    this.authorService.getAuthors().subscribe((authors) => {
      authors.forEach((author) => author.FIO = author.surname + ' ' + author.name + ' ' + author.patronymic);
      this.authors = authors;
    });
    this.genreService.getGenres().subscribe((genres) => this.genres = genres);
  }

  addBook(): void {
    this.bookService.addBook(this.book).subscribe((res) => {
      this.msgs = [];
      if (res) {
        this.msgs.push({severity: 'success', summary: 'Успех', detail: 'Книга была добавлена'});
        setTimeout(() => this.router.navigate(['admin', 'books']), 500);
      } else {
        this.msgs.push({severity: 'error', summary: 'Ошибка', detail: 'Не удалось добавить книгу'});
      }
    });
  }

  updateBook(): void {
    this.bookService.saveBook(this.book).subscribe(result => {
      if (result) {
        this.msgs.push({severity: 'success', summary: 'Успех', detail: 'Данные о книге были обнавлены!'});
      } else {
        this.msgs.push({severity: 'error', summary: 'Ошибка', detail: 'Не удалось обновить данные о книге!'});
      }
    });
  }
}
