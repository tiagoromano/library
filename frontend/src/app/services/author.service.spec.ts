import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthorService } from './author.service';
import { Author } from '../models';
import { environment } from '../../environments/environment';

describe('AuthorService', () => {
    let service: AuthorService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthorService]
        });

        service = TestBed.inject(AuthorService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch list of authors', () => {
        const dummyAuthors: Author[] = [
            { id: 1, name: 'Author 1' },
            { id: 2, name: 'Author 2' }
        ];

        service.list().subscribe(authors => {
            expect(authors.length).toBe(2);
            expect(authors).toEqual(dummyAuthors);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/authors`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyAuthors);
    });

    it('should fetch a single author by id', () => {
        const dummyAuthor: Author = { id: 1, name: 'Author 1' };

        service.get(1).subscribe(author => {
            expect(author).toEqual(dummyAuthor);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/authors/1`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyAuthor);
    });

    it('should create a new author', () => {
        const newAuthor: Author = { id: 3, name: 'Author 3' };

        service.create(newAuthor).subscribe(author => {
            expect(author).toEqual(newAuthor);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/authors`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newAuthor);
        req.flush(newAuthor);
    });

    it('should update an existing author', () => {
        const updatedAuthor: Author = { id: 1, name: 'Updated Author' };

        service.update(1, updatedAuthor).subscribe(author => {
            expect(author).toEqual(updatedAuthor);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/authors/1`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatedAuthor);
        req.flush(updatedAuthor);
    });

    it('should delete an author', () => {
        service.delete(1).subscribe(response => {
            expect(response).toBeTruthy();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/authors/1`);
        expect(req.request.method).toBe('DELETE');
        req.flush({});
    });
});
