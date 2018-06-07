import {Component, OnInit} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../../services/book.service';
import {Book} from '../../../domains/book';
import {routes} from "../../../app.routes";
import {AuthorService} from "../../../services/author.service";
import {Author} from "../../../domains/author";
import {Genre} from "../../../domains/genre";
import {GenreService} from "../../../services/genre.service";
import {IssueService} from "../../../services/issue.service";
import {IssuedBookService} from "../../../services/issued-book.service";
import {IssuedBooks} from "../../../domains/issued-books";

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
  searchBook: string = '';
  eventSaveState: LazyLoadEvent = {};
  display: boolean = false;
  serchDTO: any = {
    authors: [],
    ganres: []
  };
  authors: Author[] = [];
  ganres: Genre[] = [];
  showBooks: Book[] = [];
  issuedBooks: IssuedBooks[] = [];

  constructor(private bookService: BookService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private route: ActivatedRoute,
              private authorsService: AuthorService,
              private genreService: GenreService,
              private issuedBooksService: IssuedBookService) {
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        console.log(params);
      });
    this.cols = [
      {field: 'name', header: 'Название'},
      {field: 'author', header: 'Автор'},
      {field: 'genre', header: 'Жанр'},
      {field: 'releaseDate', header: 'Дата релиза'}
    ];
    this.authorsService.getAuthors().subscribe(value => {
      this.authors = value;
      this.authors.forEach(value1 => value1.FIO = value1.surname + ' ' + value1.name + ' ' + value1.patronymic);
    });
    this.genreService.getGenres().subscribe(value => this.ganres = value);
    this.bookService.getAllBooks().subscribe(books => {
      this.books = books;
      this.showBooks = books;
      this.totalRecords = books.length;
      this.loading = false;
    });
    this.loading = true;
  }

  bookInfo(id: number): void {
    const isNavigate = this.router.navigate(['book', id]);
    if (!isNavigate) {
      console.log('Navigate error');
    }
  }

  search(): void {
    this.serchDTO.ganres = this.serchDTO.ganres ? this.serchDTO.ganres : [];
    this.showBooks = this.books.filter(book => book.name.includes(this.searchBook));
    this.showBooks = this.showBooks.filter(book => this.serchDTO.ganres.length > 0 ?
      this.serchDTO.ganres.filter(value => value.name === book.genre.name).length > 0 : true);
    this.showBooks = this.showBooks.filter(book => this.serchDTO.authors.length > 0 ?
      this.serchDTO.authors.filter(author => book.author.id === author.id).length > 0 : true);
    if (this.serchDTO.dateStart) this.showBooks = this.showBooks.filter(value =>  +value.releaseDate >= +this.serchDTO.dateStart);
    if (this.serchDTO.dateEnd) this.showBooks = this.showBooks.filter(value => +value.releaseDate <= +this.serchDTO.dateEnd);
  }

  getBookSrc(bookPictureId): string {
    return bookPictureId ?  'http://localhost:8080/server_resources/image/' + bookPictureId : 'assets/layout/images/deffBookImg.png';
  }
}
