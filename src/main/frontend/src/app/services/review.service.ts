import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ReviewsOfTheBook} from "../domains/reviews-of-the-book";

@Injectable()
export class ReviewService {
  private uri = 'http://localhost:8080/admin/json/';

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
        sort: sortBy + ',' + orderBy
      }
    });
  }

  deleteReviewById(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.uri + 'deleteReview');
  }
}
