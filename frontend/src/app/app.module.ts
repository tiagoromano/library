import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GenresListComponent } from './genres/genres-list.component';
import { GenresFormComponent } from './genres/genres-form.component';
import { AuthorsListComponent } from './authors/authors-list.component';
import { AuthorsFormComponent } from './authors/authors-form.component';
import { BooksListComponent } from './books/books-list.component';
import { BooksFormComponent } from './books/books-form.component';
import { AuthInterceptor } from './auth.interceptor';
import { LoginComponent} from "./login/login.component";

@NgModule({
  declarations: [AppComponent, GenresListComponent, GenresFormComponent, AuthorsListComponent, AuthorsFormComponent, BooksListComponent, BooksFormComponent, LoginComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
