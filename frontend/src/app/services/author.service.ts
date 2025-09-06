import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Author} from '../models';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthorService {
    constructor(private http: HttpClient) {
    }

    list(): Observable<Author[]> {
        return this.http.get<Author[]>(`${environment.apiUrl}/authors`);
    }

    get(id: number) {
        return this.http.get<Author>(`${environment.apiUrl}/authors/${id}`);
    }

    create(a: Author) {
        return this.http.post<Author>(`${environment.apiUrl}/authors`, a);
    }

    update(id: number, a: Author) {
        return this.http.put<Author>(`${environment.apiUrl}/authors/${id}`, a);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/authors/${id}`);
    }
}
