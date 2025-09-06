import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GenreService} from '../services/genre.service';
import {ActivatedRoute, Router} from '@angular/router';
import {handleHttpError} from "../utils/http-error-handler";

@Component({
    selector: 'app-genres-form',
    template: `
        <h2>Gênero</h2>
        <form [formGroup]="f" (ngSubmit)="save()">
            <label>Nome: <input formControlName="name"></label>
            <div *ngIf="f.controls.name.invalid && f.controls.name.touched">Nome é obrigatório</div>
            <div class="button-group">
                <button type="submit" [disabled]="f.invalid">Salvar</button>
                <button (click)="cancel()">Cancelar</button>
            </div>
        </form>
    `
})
export class GenresFormComponent implements OnInit {
    f: FormGroup;
    id?: number;

    constructor(private fb: FormBuilder, private svc: GenreService, private route: ActivatedRoute, private router: Router) {
        this.f = this.fb.group({name: ['', Validators.required]});
    }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.svc.get(+id).subscribe(r => this.f.patchValue(r));
            this.id = +id;
        }
    }

    save() {
        if (this.id) {
            this.svc.update(this.id, this.f.value).subscribe({
                next: () => this.router.navigate(['/genres']),
                error: handleHttpError
            });
        } else {
            this.svc.create(this.f.value).subscribe({
                next: () => this.router.navigate(['/genres']),
                error: handleHttpError
            });
        }
    }

    cancel() {
        this.router.navigate(['/genres']);
    }
}
