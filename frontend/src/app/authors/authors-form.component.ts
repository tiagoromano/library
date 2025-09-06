import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorService} from '../services/author.service';
import {ActivatedRoute, Router} from '@angular/router';
import {handleHttpError} from "../utils/http-error-handler";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
    selector: 'app-authors-form', template: `
        <h2>Autor</h2>
        <form [formGroup]="f" (ngSubmit)="save()">
            <label>Nome: <input formControlName="name"></label>
            <label>Bio: <textarea formControlName="bio"></textarea></label>
            <div class="button-group">
                <button type="submit" [disabled]="f.invalid">Salvar</button>
                <button (click)="cancel()">Cancelar</button>
            </div>
        </form>
    `
})
export class AuthorsFormComponent implements OnInit {
    f: FormGroup;
    id?: number;

    constructor(private fb: FormBuilder, private svc: AuthorService, private route: ActivatedRoute, private router: Router) {
        this.f = this.fb.group({name: ['', Validators.required], bio: ['']});
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
            this.svc.update(this.id, this.f.value)
                .subscribe({
                    next: () => this.router.navigate(['/authors']),
                    error: handleHttpError
                });
        } else {
            this.svc.create(this.f.value)
                .subscribe({
                    next: () => this.router.navigate(['/authors']),
                    error: handleHttpError
                });
        }
    }

    cancel() {
        this.router.navigate(['/authors']);
    }
}
