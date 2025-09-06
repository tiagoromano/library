import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Book} from '../models';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class BookService {
    constructor(private http: HttpClient) {
    }

    list(): Observable<Book[]> {
        return this.http.get<Book[]>(`${environment.apiUrl}/books`);
    }

    get(id: number) {
        return this.http.get<Book>(`${environment.apiUrl}/books/${id}`);
    }

    create(b: Book) {
        return this.http.post<Book>(`${environment.apiUrl}/books`, b);
    }

    update(id: number, b: Book) {
        return this.http.put<Book>(`${environment.apiUrl}/books/${id}`, b);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/books/${id}`);
    }
}
