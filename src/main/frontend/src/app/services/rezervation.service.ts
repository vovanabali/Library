import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Book} from '../domains/book';
import {HttpClient} from '@angular/common/http';
import {RezervationBooksComponent} from "../components/librarian/rezervation-books/rezervation-books.component";
import {Rezervation} from "../domains/rezervation";
import {IssuedBooks} from "../domains/issued-books";

@Injectable()
export class RezervationService {
  private uri = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  getAllRezervations(): Observable<Rezervation[]> {
    return this.http.get<Rezervation[]>(this.uri + '/rezervation/list');
  }

  delete(id: number): Observable<boolean> {
    return this.http.post<boolean>(this.uri + '/rezervation/delete', {params: {id: id.toString()}});
  }

  issueRezrv(id: number): Observable<IssuedBooks> {
    return this.http.get<IssuedBooks>(this.uri + '/rezervation/issue_rezrv', {params: {id: id.toString()}});
  }
}
