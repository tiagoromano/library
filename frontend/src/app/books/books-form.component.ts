import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../services/book.service';
import {GenreService} from '../services/genre.service';
import {AuthorService} from '../services/author.service';
import {ActivatedRoute, Router} from '@angular/router';
import {handleHttpError} from "../utils/http-error-handler";

@Component({
    selector: 'app-books-form', template: `
        <h2>Livro</h2>
        <form [formGroup]="f" (ngSubmit)="save()">
            <label>Título: <input formControlName="title"></label>
            <label>Resumo: <textarea formControlName="summary"></textarea></label>
            <label>Autor: <select formControlName="authorId">
                <option *ngFor="let a of authors" [value]="a.id">{{ a.name }}</option>
            </select></label>
            <label>Gênero: <select formControlName="genreId">
                <option *ngFor="let g of genres" [value]="g.id">{{ g.name }}</option>
            </select></label>
            <div class="button-group">
                <button type="submit" [disabled]="f.invalid">Salvar</button>
                <button (click)="cancel()">Cancelar</button>
            </div>
        </form>
    `
})
export class BooksFormComponent implements OnInit {
    f: FormGroup;
    id?: number;
    authors: any[] = [];
    genres: any[] = [];

    constructor(private fb: FormBuilder, private svc: BookService, private authorSvc: AuthorService, private genreSvc: GenreService, private route: ActivatedRoute, private router: Router) {
        this.f = this.fb.group({
            title: ['', Validators.required],
            summary: [''],
            authorId: [null, Validators.required],
            genreId: [null, Validators.required]
        });
    }

    ngOnInit() {
        this.authorSvc.list().subscribe(r => this.authors = r);
        this.genreSvc.list().subscribe(r => this.genres = r);
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.svc.get(+id).subscribe(r => this.f.patchValue(r));
            this.id = +id;
        }
    }

    save() {
        if (this.id) {
            this.svc.update(this.id, this.f.value).subscribe({
                next: () => this.router.navigate(['/books']),
                error: handleHttpError
            });
        } else {
            this.svc.create(this.f.value).subscribe({
                next: () => this.router.navigate(['/books']),
                error: handleHttpError
            });
        }
    }

    cancel() {
        this.router.navigate(['/books']);
    }
}
