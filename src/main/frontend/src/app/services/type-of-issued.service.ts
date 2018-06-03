import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TypeOfIssue} from '../domains/type-of-issue';

@Injectable()
export class TypeOfIssuedService {
  private uri = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  getTypeOfIssued(): Observable<TypeOfIssue[]> {
    return this.http.get<TypeOfIssue[]>(this.uri + 'typeOfIssues');
  }

  getSlice(start: number, rows: number, sortField: string, sortOrder: number): Observable<TypeOfIssue[]> {
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
    return this.http.get<TypeOfIssue[]>(this.uri + 'admin/json/typeOfIssueSlice', {
      params: {
        page: start.toString(),
        size: rows.toString(),
        sort: sortBy + ',' + orderBy
      }
    });
  }

  getTypeOfIssueById(id: number): Observable<TypeOfIssue> {
    return this.http.get<TypeOfIssue>(this.uri + 'typeOfIssue', {params: {id: id.toString()}});
  }

  addTypeOfIssue(genre: TypeOfIssue): Observable<boolean> {
    return this.http.post<boolean>(this.uri + 'admin/json/addTypeOfIssue', genre);
  }

  updateTypeOfIssue(genre: TypeOfIssue): Observable<boolean> {
    return this.http.post<boolean>(this.uri + 'admin/json/updateTypeOfIssue', genre);
  }

  deleteTypeOfIssueById(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.uri + 'admin/json/deleteTypeOfIssue', {params: {id: id.toString()}});
  }

  getCount(): Observable<number> {
    return this.http.get<number>(this.uri + 'admin/json/countTypeOfIssued');
  }
}
