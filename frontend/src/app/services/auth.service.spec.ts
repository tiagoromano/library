import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [AuthService]
        });

        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should login and store token', () => {
        const dummyResponse = { token: 'fake-jwt-token' };
        const credentials = { username: 'user', password: 'pass' };

        service.login(credentials).subscribe(res => {
            expect(res).toEqual(dummyResponse);
            expect(localStorage.getItem('token')).toBe('fake-jwt-token');
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(credentials);

        req.flush(dummyResponse);
    });

    it('should remove token and navigate on logout', () => {
        spyOn(service['router'], 'navigate');
        localStorage.setItem('token', 'fake-token');

        service.logout();

        expect(localStorage.getItem('token')).toBeNull();
        expect(service['router'].navigate).toHaveBeenCalledWith(['/login']);
    });

    it('getToken should return token from localStorage', () => {
        localStorage.setItem('token', 'my-token');
        expect(service.getToken()).toBe('my-token');
    });

    it('isAuthenticated should return true if token exists', () => {
        localStorage.setItem('token', 'my-token');
        expect(service.isAuthenticated()).toBeTrue();
    });

    it('isAuthenticated should return false if no token', () => {
        localStorage.removeItem('token');
        expect(service.isAuthenticated()).toBeFalse();
    });
});
