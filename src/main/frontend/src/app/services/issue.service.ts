import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {BookInStock} from "../domains/book-in-stock";
import {Extradition} from "../domains/extradition";

@Injectable()
export class IssueService {

  private uri = 'http://localhost:8080/librarian/json/';

  constructor(private http: HttpClient) {
  }

  checkBooks(extraition: Extradition): Observable<BookInStock[]> {
    return this.http.post<BookInStock[]>(this.uri + 'checkIssuedBooks', extraition);
  }
}
