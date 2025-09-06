import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Genre} from '../models';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class GenreService {
    constructor(private http: HttpClient) {
    }

    list(): Observable<Genre[]> {
        return this.http.get<Genre[]>(`${environment.apiUrl}/genres`);
    }

    get(id: number) {
        return this.http.get<Genre>(`${environment.apiUrl}/genres/${id}`);
    }

    create(g: Genre) {
        return this.http.post<Genre>(`${environment.apiUrl}/genres`, g);
    }

    update(id: number, g: Genre) {
        return this.http.put<Genre>(`${environment.apiUrl}/genres/${id}`, g);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/genres/${id}`);
    }
}
