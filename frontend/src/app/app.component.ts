import { Component } from '@angular/core';
import { AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  template: `
      <h1>Biblioteca</h1>
      <nav *ngIf="authService.isAuthenticated()">
          <a routerLink="/books">Livros</a> |
          <a routerLink="/authors">Autores</a> |
          <a routerLink="/genres">Gêneros</a> |
          <a href="#" (click)="logout()" >Logout</a>
      </nav>
      <router-outlet></router-outlet>
  `
})
export class AppComponent {
    constructor(public authService: AuthService) {

    }

    logout() {
        this.authService.logout();
    }
}
