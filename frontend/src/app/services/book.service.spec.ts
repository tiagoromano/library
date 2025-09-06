import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { Book } from '../models';
import { environment } from '../../environments/environment';

describe('BookService', () => {
    let service: BookService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BookService]
        });
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch list of books', () => {
        const dummyBooks: Book[] = [
            { id: 1, title: 'Book 1', authorId: 1, genreId: 10, authorName: 'Author 1', genreName: 'Genre 1' },
            { id: 2, title: 'Book 2', authorId: 2, genreId: 20, authorName: 'Author 2', genreName: 'Genre 2' }
        ];

        service.list().subscribe(books => {
            expect(books.length).toBe(2);
            expect(books).toEqual(dummyBooks);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/books`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyBooks);
    });

    it('should fetch a single book by id', () => {
        const dummyBook: Book = { id: 1, title: 'Book 1', authorId: 1, genreId: 10, authorName: 'Author 1', genreName: 'Genre 1' };

        service.get(1).subscribe(book => {
            expect(book).toEqual(dummyBook);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/books/1`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyBook);
    });

    it('should create a new book', () => {
        const newBook: Book = { id: 3, title: 'Book 3', authorId: 1, genreId: 10, authorName: 'Author 1', genreName: 'Genre 1' };

        service.create(newBook).subscribe(book => {
            expect(book).toEqual(newBook);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/books`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newBook);
        req.flush(newBook);
    });

    it('should update an existing book', () => {
        const updatedBook: Book = { id: 1, title: 'Updated Book', authorId: 1, genreId: 10, authorName: 'Author 1', genreName: 'Genre 1' };

        service.update(1, updatedBook).subscribe(book => {
            expect(book).toEqual(updatedBook);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/books/1`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatedBook);
        req.flush(updatedBook);
    });

    it('should delete a book', () => {
        service.delete(1).subscribe(response => {
            expect(response).toBeNull();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/books/1`);
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});