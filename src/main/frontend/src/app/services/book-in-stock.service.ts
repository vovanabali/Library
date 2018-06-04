import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from '../domains/book';
import {Observable} from 'rxjs/Observable';
import {BookInStock} from '../domains/book-in-stock';

@Injectable()
export class BookInStockService {

  private uri = 'http://localhost:8080/admin/json/';

  constructor(private http: HttpClient) {
  }

  getAllBookInStock(): Observable<BookInStock[]> {
    return this.http.get<BookInStock[]>(this.uri + 'storageBooks');
  }

  addBookInStock(bookInStock: BookInStock): Observable<boolean> {
    return this.http.post<boolean>(this.uri + 'addStorageBooks', bookInStock);
  }

  deleteBookInStock(bookInStock: BookInStock): Observable<boolean> {
    return this.http.post<boolean>(this.uri + 'deleteStorageBooks', bookInStock);
  }

  deleteBookInStockById(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.uri + 'deleteStorageBooksById', {params: {id: id.toString()}});
  }

  getBookInStockById(bookInStockId: number): Observable<BookInStock> {
    return this.http.get<BookInStock>(this.uri + 'getStorageBooksById', {params: {id: bookInStockId.toString()}});
  }

  saveBookInStock(bookInStock: BookInStock): Observable<boolean> {
    return this.http.post<boolean>(this.uri + 'saveStorageBook', bookInStock);
  }

  slice(start: number, rows: number, sortField: string, sortOrder: number): Observable<BookInStock[]> {
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
    return this.http.get<BookInStock[]>(this.uri + 'storageBooksSlice', {
      params: {
        page: start.toString(),
        size: rows.toString(),
        sort: sortBy + ',' + orderBy
      }
    });
  }

  getAvailabelBooks(start: number, rows: number, sortField: string, sortOrder: number, filterName: string): Observable<Book[]> {
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

    return this.http.get<Book[]>("http://localhost:8080/librarian/json/available_books_in_stock", {
      params: {
        page: start.toString(),
        size: rows.toString(),
        sort: sortBy + ',' + orderBy,
        name: filterName
      }
    });
  }


  getAvailabelCount(serch: string) : Observable<number> {
    return this.http.get<number>('http://localhost:8080/librarian/json/available_books_in_stock_count', {params: {name: serch}});
  }
}
