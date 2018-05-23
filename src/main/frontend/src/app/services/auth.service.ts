import {Injectable} from '@angular/core';
import {Persona} from '../domains/persona';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";


@Injectable()
export class AuthService {
  public token: string;
  private loginUserURL = 'http://localhost:8080/login';
  private authUserURL = 'http://localhost:8080/sign';

  constructor(private http: HttpClient) {
  }

  login(user: Persona): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(this.loginUserURL, user, {
      observe: 'response', headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getCurrentUser(): Observable<Persona> {
    return this.http.get<Persona>('http://localhost:8080/currentUser');
  }

  regUser(user: Persona): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:8080/registration', user);
  }

  authUser(user: Persona) {
    this.http.post<boolean>(this.authUserURL, user, {
      observe: 'response', headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe((resp: HttpResponse<any>) => {
      const token = resp.headers.get('Authorization');
      this.token = token;
      localStorage.setItem('AuthToken', token);
    });
  }

  logOut(): void {
    this.token = null;
    localStorage.clear();
  }
}
