import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-layout',
  template: `
    <h1>Biblioteca</h1>
    <nav>
      <a routerLink="/books">Livros</a> |
      <a routerLink="/authors">Autores</a> |
      <a routerLink="/genres">Gêneros</a> |
      <a href="#" (click)="logout()">Logout</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class MainLayoutComponent {
    constructor(private authService: AuthService) {}

    logout() {
        this.authService.logout();
    }
}
