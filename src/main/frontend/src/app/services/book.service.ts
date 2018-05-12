import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Book} from '../domains/book';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BookService {
  private uri = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.uri + 'books');
  }

  addBook(book: Book): Observable<boolean> {
    return this.http.post<boolean>(this.uri + 'admin/addBook', book);
  }

  deleteBook(book: Book): Observable<boolean> {
    return this.http.post<boolean>(this.uri + 'admin/deleteBook', book);
  }

  deleteBookById(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.uri + 'admin/deleteBookById', {params: {id: id.toString()}});
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(this.uri + 'getBookById', {params: {id: bookId.toString()}});
  }

  saveBook(book: Book): Observable<boolean> {
    return this.http.post<boolean>(this.uri + 'admin/saveBook', book);
  }

  slice(start: number, rows: number, sortField: string, sortOrder: number, filterName: string): Observable<Book[]> {
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
    if (filterName === null) {
      filterName = '';
    }

    return this.http.get<Book[]>(this.uri + 'booksSlice', {
      params: {
        page: start.toString(),
        size: rows.toString(),
        sort: sortBy + ',' + orderBy,
        name: filterName
      }
    });
  }

  getCount(): Observable<number> {
    return this.http.get<number>(this.uri + 'bookCount');
  }

  getCountByName(name: string): Observable<number> {
    if (name === null) {
      name = '';
    }
    return this.http.get<number>(this.uri + 'bookCountByName', {params: {name: name}});
  }
}
