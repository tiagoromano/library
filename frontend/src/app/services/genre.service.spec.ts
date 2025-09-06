import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GenreService } from './genre.service';
import { Genre } from '../models';
import { environment } from '../../environments/environment';

describe('GenreService', () => {
    let service: GenreService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GenreService]
        });

        service = TestBed.inject(GenreService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch list of genres', () => {
        const dummyGenres: Genre[] = [
            { id: 1, name: 'Genre 1' },
            { id: 2, name: 'Genre 2' }
        ];

        service.list().subscribe(genres => {
            expect(genres.length).toBe(2);
            expect(genres).toEqual(dummyGenres);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/genres`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyGenres);
    });

    it('should fetch a single genre by id', () => {
        const dummyGenre: Genre = { id: 1, name: 'Genre 1' };

        service.get(1).subscribe(genre => {
            expect(genre).toEqual(dummyGenre);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/genres/1`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyGenre);
    });

    it('should create a new genre', () => {
        const newGenre: Genre = { id: 3, name: 'Genre 3' };

        service.create(newGenre).subscribe(genre => {
            expect(genre).toEqual(newGenre);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/genres`);
        expect(req.request.method).toBe('POST');
        req.flush(newGenre);
    });

    it('should update an existing genre', () => {
        const updatedGenre: Genre = { id: 1, name: 'Updated Genre' };

        service.update(1, updatedGenre).subscribe(genre => {
            expect(genre).toEqual(updatedGenre);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/genres/1`);
        expect(req.request.method).toBe('PUT');
        req.flush(updatedGenre);
    });

    it('should delete a genre', () => {
        service.delete(1).subscribe(response => {
            expect(response).toBeNull();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/genres/1`);
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});