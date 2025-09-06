import {Component, OnInit} from '@angular/core';
import {AuthorService} from '../services/author.service';
import {Router} from '@angular/router';
import {handleHttpError} from "../utils/http-error-handler";

@Component({
    selector: 'app-authors-list', template: `
        <h2>Autores
            <button (click)="new()">Novo</button>
        </h2>
        <ul>
            <li *ngFor="let a of authors">{{ a.name }}
                <button (click)="edit(a)">Editar</button>
                <button (click)="del(a)">Excluir</button>
            </li>
        </ul>
    `
})
export class AuthorsListComponent implements OnInit {
    authors: any[] = [];

    constructor(private svc: AuthorService, private router: Router) {
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.svc.list().subscribe(r => this.authors = r);
    }

    new() {
        this.router.navigate(['/authors/new']);
    }

    edit(a: any) {
        this.router.navigate(['/authors', a.id]);
    }

    del(a: any) {
        if (confirm('Excluir?')) {
            this.svc.delete(a.id).subscribe({
                next: () => this.load(),
                error: handleHttpError
            });
        }
    }
}
