import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Role} from "../domains/role";
import {HttpClient} from "@angular/common/http";
import {BlackList} from "../domains/black-list";

@Injectable()
export class BlackListService {
  private uri = 'http://localhost:8080/black_list/';

  constructor(private http: HttpClient) { }

  getAllBlackLists(): Observable<BlackList[]> {
    return this.http.get<BlackList[]>(this.uri + 'blackList');
  }

  getCountBlackList(): Observable<number> {
    return this.http.get<number>(this.uri + 'blackListCount');
  }

  getBlackListById(id: number): Observable<number> {
    return this.http.get<number>(this.uri + 'blackListById', {
      params: {
        id: id.toString(),
      }
    });
  }

  deleteBlackListById(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.uri + 'deleteBlackList', {
      params: {
        id: id.toString(),
      }
    });
  }

  save(blackList: BlackList): Observable<BlackList> {
    return this.http.post<BlackList>(this.uri + 'saveBlackList', blackList);
  }
}
