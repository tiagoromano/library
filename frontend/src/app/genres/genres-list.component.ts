import {Component, OnInit} from '@angular/core';
import {GenreService} from '../services/genre.service';
import {Router} from '@angular/router';
import {handleHttpError} from "../utils/http-error-handler";

@Component({
    selector: 'app-genres-list',
    template: `
        <h2>Gêneros
            <button (click)="new()">Novo</button>
        </h2>
        <ul>
            <li *ngFor="let g of genres">{{ g.name }}
                <button (click)="edit(g)">Editar</button>
                <button (click)="del(g)">Excluir</button>
            </li>
        </ul>
    `
})
export class GenresListComponent implements OnInit {
    genres: any[] = [];

    constructor(private svc: GenreService, private router: Router) {
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.svc.list().subscribe(r => this.genres = r);
    }

    new() {
        this.router.navigate(['/genres/new']);
    }

    edit(g: any) {
        this.router.navigate(['/genres', g.id]);
    }

    del(g: any) {
        if (confirm('Excluir?')) {
            this.svc.delete(g.id).subscribe({
                next: () => this.load(),
                error: handleHttpError
            });
        }
    }
}
