import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {IssuedBooks} from '../domains/issued-books';

@Injectable()
export class IssuedBookService {
  private uri = 'http://localhost:8080/admin/json/';

  constructor(private http: HttpClient) {

  }

  getIssuedBooks(): Observable<IssuedBooks[]> {
    return this.http.get<IssuedBooks[]>(this.uri + 'issuedBooks');
  }

  getIssuedBooksInReadingRoom(): Observable<IssuedBooks[]> {
    return this.http.get<IssuedBooks[]>(this.uri + 'issuedBooksInReadingRoom');
  }

  getCountIssuedBooks(): Observable<number> {
    return this.http.get<number>(this.uri + 'countIssuedBooks');
  }

  getSlice(start: number, rows: number, sortField: string, sortOrder: number, sort: string): Observable<IssuedBooks[]> {
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
    return this.http.get<IssuedBooks[]>(this.uri + 'issuedBookSlice', {
      params: {
        page: start.toString(),
        size: rows.toString(),
        sort: sortBy + ',' + orderBy,
        sortField: sort
      }
    });
  }

  getSliceHistory(start: number, rows: number, sortField: string, sortOrder: number, sort: string): Observable<IssuedBooks[]> {
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
    return this.http.get<IssuedBooks[]>(this.uri + 'issuedBookSliceHistory', {
      params: {
        page: start.toString(),
        size: rows.toString(),
        sort: sortBy + ',' + orderBy,
        sortField: sort
      }
    });
  }

  getIssuedBookById(id: number): Observable<IssuedBooks> {
    return this.http.get<IssuedBooks>(this.uri + 'issuedBook', {params: {id: id.toString()}});
  }

  addIssuedBook(genre: IssuedBooks): Observable<boolean> {
    return this.http.post<boolean>(this.uri + 'addIssuedBook', genre);
  }

  updateIssuedBook(genre: IssuedBooks): Observable<boolean> {
    return this.http.post<boolean>(this.uri + 'updateIssuedBook', genre);
  }

  deleteIssuedBookById(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.uri + 'deleteIssuedBook', {params: {id: id.toString()}});
  }

  returnBook(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.uri + 'return_book', {
      params: {
        id: id.toString()
      }
    });
  }
}
