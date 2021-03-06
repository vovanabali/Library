import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Persona} from '../domains/persona';
import {ProfileDTO} from "../domains/profileDTO";
import {PersonaDto} from "../domains/persona-dto";

@Injectable()
export class PersonaService {
  private uri = 'http://localhost:8080/admin/json/';

  constructor(private http: HttpClient) {
  }

  getPersons(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.uri + 'personas');
  }

  count(): Observable<number> {
    return this.http.get<number>(this.uri + 'personas_count');
  }

  getSlice(start: number, rows: number, sortField: string, sortOrder: number): Observable<Persona[]> {
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
    return this.http.get<Persona[]>(this.uri + 'personaSlice', {
      params: {
        page: start.toString(),
        size: rows.toString(),
        sort: sortBy + ',' + orderBy
      }
    });
  }

  getSliceAppruved(start: number, rows: number, sortField: string, sortOrder: number): Observable<Persona[]> {
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
    return this.http.get<Persona[]>(this.uri + 'current_personas_slice', {
      params: {
        page: start.toString(),
        size: rows.toString(),
        sort: sortBy + ',' + orderBy
      }
    });
  }

  getSliceAppruvedLibrary(start: number, rows: number, sortField: string, sortOrder: number, filter: string): Observable<PersonaDto[]> {
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
    if (!filter) {
      filter = "";
    }
    return this.http.get<PersonaDto[]>(this.uri + 'library_current_personas_slice', {
      params: {
        page: start.toString(),
        size: rows.toString(),
        sort: sortBy + ',' + orderBy,
        filter: filter
      }
    });
  }

  getPersonaById(id: number): Observable<Persona> {
    return this.http.get<Persona>(this.uri + 'persona', {params: {id: id.toString()}});
  }

  addPersona(persona: Persona): Observable<boolean> {
    return this.http.post<boolean>(this.uri + 'addPersona', persona);
  }

  updatePersona(persona: Persona): Observable<boolean> {
    return this.http.post<boolean>(this.uri + 'updatePersona', persona);
  }

  deletePersonaById(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.uri + 'deletePersona', {params: {id: id.toString()}});
  }

  getProfile(): Observable<ProfileDTO> {
    return this.http.get<ProfileDTO>('http://localhost:8080/profile');
  }
}
