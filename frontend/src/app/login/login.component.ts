import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.css'],
    template: `
        <div *ngIf="!authService.isAuthenticated()">
            <h2>Login</h2>

            <form (ngSubmit)="onLogin()" [formGroup]="f">
                <label for="username">Usuário
                    <input formControlName="username" required/>
                </label>
                <label for="password">Senha
                    <input type="password" formControlName="password" required/>
                </label>
                <button type="submit" [disabled]="f.invalid">Entrar</button>
                <div *ngIf="errorMessage" class="alert">{{ errorMessage }}</div>
            </form>
        </div>
    `
})
export class LoginComponent {
    f: FormGroup;
    errorMessage = '';

    constructor(private fb: FormBuilder, public authService: AuthService, private router: Router) {
        this.f = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onLogin() {
        this.authService.login(this.f.value).subscribe({
            next: () => this.router.navigate(['/books']),
            error: () => (this.errorMessage = 'Usuário ou senha inválidos')
        });
    }
}