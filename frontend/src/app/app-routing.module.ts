import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GenresListComponent} from './genres/genres-list.component';
import {GenresFormComponent} from './genres/genres-form.component';
import {AuthorsListComponent} from './authors/authors-list.component';
import {AuthorsFormComponent} from './authors/authors-form.component';
import {BooksListComponent} from './books/books-list.component';
import {BooksFormComponent} from './books/books-form.component';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoginLayoutComponent} from "./login-layout/login-layout.component";
import {MainLayoutComponent} from "./main-layout/main-layout.component";

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '',
        component: LoginLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent }
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {path: 'genres', component: GenresListComponent, canActivate: [AuthGuard]},
            {path: 'genres/new', component: GenresFormComponent, canActivate: [AuthGuard]},
            {path: 'genres/:id', component: GenresFormComponent, canActivate: [AuthGuard]},
            {path: 'authors', component: AuthorsListComponent, canActivate: [AuthGuard]},
            {path: 'authors/new', component: AuthorsFormComponent, canActivate: [AuthGuard]},
            {path: 'authors/:id', component: AuthorsFormComponent, canActivate: [AuthGuard]},
            {path: 'books', component: BooksListComponent, canActivate: [AuthGuard]},
            {path: 'books/new', component: BooksFormComponent, canActivate: [AuthGuard]},
            {path: 'books/:id', component: BooksFormComponent, canActivate: [AuthGuard]}
        ]
    },
    { path: '**', redirectTo: 'login' }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
