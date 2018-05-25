import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Role} from "../domains/role";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RoleService {
  private uri = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.uri + 'roles');
  }

  getRoleById(id: any): Observable<Role> {
    return this.http.get<Role>(this.uri + "role", {
      params: {
        id: id.toString(),
      }
    });
  }
}
