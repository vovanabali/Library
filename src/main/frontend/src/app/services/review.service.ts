import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ReviewsOfTheBook} from "../domains/reviews-of-the-book";

@Injectable()
export class ReviewService {
  private uri = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  getAllRewiews(): Observable<ReviewsOfTheBook[]> {
    return this.http.get<ReviewsOfTheBook[]>(this.uri + 'reviews');
  }

  slice(start: number, rows: number, sortField: string, sortOrder: number): Observable<ReviewsOfTheBook[]> {
    let orderBy = 'asc';
    if (sortOrder === 1) {
      orderBy = 'ASC';
    } else {
      orderBy = 'DESC';
    }
    let sortBy = sortField;
    if (sortField === undefined) {
      sortBy = '';
    }
    return this.http.get<ReviewsOfTheBook[]>(this.uri + 'reviewsSlice', {
      params: {
        page: start.toString(),
        size: rows.toString(),
        sort: sortBy + ',' + orderBy,
      }
    });
  }

  sliceByBook(start: number, rows: number, sortField: string, sortOrder: number, bookId): Observable<ReviewsOfTheBook[]> {
    let orderBy = 'asc';
    if (sortOrder === 1) {
      orderBy = 'ASC';
    } else {
      orderBy = 'DESC';
    }
    let sortBy = sortField;
    if (sortField === undefined) {
      sortBy = '';
    }
    return this.http.get<ReviewsOfTheBook[]>(this.uri + 'reviewsSliceByBookId', {
      params: {
        page: start.toString(),
        size: rows.toString(),
        sort: sortBy + ',' + orderBy,
        bookId: bookId
      }
    });
  }

  totalreviewsByBook(bookId: number): Observable<number> {
    return this.http.get<number>(this.uri + "bookReviewsCount", {
      params: {
        id: bookId.toString()
      }
    });
  }

  bookRaiting(bookId: number): Observable<number> {
    return this.http.get<number>(this.uri + "bookRaiting", {
      params: {
        id: bookId.toString()
      }
    });
  }

  deleteReviewById(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.uri + 'deleteReview');
  }

  addReview(review: ReviewsOfTheBook): Observable<boolean> {
    return this.http.post<boolean>(this.uri + "addReview", review);
  }
}
