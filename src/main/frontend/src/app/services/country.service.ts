import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Country} from '../domains/country';

@Injectable()
export class CountryService {
  private uri = 'http://localhost:8080/admin/json/';

  constructor(private http: HttpClient) {
  }

  getCountrys(): Observable<Country[]> {
    return this.http.get<Country[]>(this.uri + 'countries');
  }

  getSlice(start: number, rows: number, sortField: string, sortOrder: number): Observable<Country[]> {
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
    return this.http.get<Country[]>(this.uri + 'countriesSlice', {
      params: {
        page: start.toString(),
        size: rows.toString(),
        sort: sortBy + ',' + orderBy,
        name: ''
      }
    });
  }

  getCountryById(id: number): Observable<Country> {
    return this.http.get<Country>(this.uri + 'country', {params: {id: id.toString()}});
  }

  addCountry(genre: Country): Observable<boolean> {
    return this.http.post<boolean>(this.uri + 'addCountry', genre);
  }

  updateCountry(genre: Country): Observable<boolean> {
    return this.http.post<boolean>(this.uri + 'updateCountry', genre);
  }

  deleteCountryById(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.uri + 'deleteCountry', {params: {id: id.toString()}});
  }

  getCount(): Observable<number> {
    return this.http.get<number>(this.uri + 'getCount');
  }
}
