import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookService} from "../../../services/book.service";
import {Book} from "../../../domains/book";
import {ReviewsOfTheBook} from "../../../domains/reviews-of-the-book";
import {ReviewService} from "../../../services/review.service";
import {LazyLoadEvent, Message} from "primeng/api";
import {Genre} from "../../../domains/genre";
import {Author} from "../../../domains/author";
import {Persona} from "../../../domains/persona";

@Component({
  selector: 'app-user-book',
  templateUrl: './user-book.component.html',
  styleUrls: ['./user-book.component.css']
})
export class UserBookComponent implements OnInit {
  id: number;
  val = 3.5;
  book = {
    id: 0,
    name: '',
    author: new Author(),
    description: '',
    genre: new Genre(),
    releaseDate: new Date()
  };
  review: ReviewsOfTheBook = new ReviewsOfTheBook();
  comments: ReviewsOfTheBook[] = [];
  totalRewiews: number = 0;
  loading: boolean = false;
  reviews: ReviewsOfTheBook[] = [];
  raiting: number = 0;
  msgs: Message[] = [];

  constructor(private route: ActivatedRoute,
              private bookService: BookService,
              private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.bookService.getBookById(this.id).subscribe((book: Book) => {
        this.book = book;
        this.review.book = book;
      });
      this.reviewService.bookRaiting(this.id).subscribe((raiting: number) => this.raiting = raiting);
    });
    this.loading = true;
  }

  lazyLoad(event: LazyLoadEvent): void {
    this.loading = true;
    console.log('lad');
    this.reviewService.sliceByBook(event.first / event.rows, event.rows, event.sortField, event.sortOrder, this.id).subscribe((reviews) => {
      this.reviews = reviews;
      this.loading = false;
    });
  }

  addReview(): void {
    const user: Persona = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      this.review.persona = user;
      this.reviewService.addReview(this.review).subscribe((result: boolean) => {
        if (result) this.msgs = [{severity: 'success', summary: 'Успех', detail: 'Коментарий оставлен успешно'}];
        else this.msgs = [{severity: 'error', summary: 'Ошибка', detail: 'Ошибка при отправки комментария'}];
      })
    } else {
      this.msgs = [{severity: 'error', summary: 'Ошибка', detail: 'Для возможности оставления комментариев необходимо авторизоваться!'}];
    }
  }

}
