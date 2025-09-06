import {Component, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {Router} from '@angular/router';
import {handleHttpError} from "../utils/http-error-handler";

@Component({
    selector: 'app-books-list', template: `
        <h2>Livros
            <button (click)="new()">Novo</button>
        </h2>
        <ul>
            <li *ngFor="let b of books">
                {{ b.title }} (Author: {{ b.authorName }}, Genre: {{ b.genreName }})
                <button (click)="edit(b)">Editar</button>
                <button (click)="del(b)">Excluir</button>
            </li>
        </ul>
    `
})
export class BooksListComponent implements OnInit {
    books: any[] = [];

    constructor(private svc: BookService, private router: Router) {
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.svc.list().subscribe(r => this.books = r);
    }

    new() {
        this.router.navigate(['/books/new']);
    }

    edit(b: any) {
        this.router.navigate(['/books', b.id]);
    }

    del(b: any) {
        if (confirm('Excluir?')) {
            this.svc.delete(b.id).subscribe({
                next: () => this.load(),
                error: handleHttpError
            });
        }
    }
}
