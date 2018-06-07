import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Genre} from '../domains/genre';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GenreService {
  private uri = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.uri + 'genres');
  }

  getSlice(start: number, rows: number, sortField: string, sortOrder: number): Observable<Genre[]> {
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
    return this.http.get<Genre[]>(this.uri + 'admin/json/ganresSlice', {
      params: {
        page: start.toString(),
        size: rows.toString(),
        sort: sortBy + ',' + orderBy
      }
    });
  }

  getGenreById(id: number): Observable<Genre> {
    return this.http.get<Genre>(this.uri + 'genre', {params: {id: id.toString()}});
  }

  addGenre(genre: Genre): Observable<boolean> {
    return this.http.post<boolean>(this.uri + 'admin/json/addGenre', genre);
  }

  updateGenre(genre: Genre): Observable<boolean> {
    return this.http.post<boolean>(this.uri + 'admin/json/updateGenre', genre);
  }

  deleteGenreById(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.uri + 'admin/json/deleteGenre', {params: {id: id.toString()}});
  }
}
