import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserMaster } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private base = `${environment.apiUrl}/User`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<UserMaster[]> {
    return this.http.get<UserMaster[]>(this.base).pipe(catchError(this.handleError));
  }

  getByUserName(userName: string): Observable<UserMaster> {
    return this.http.get<UserMaster>(`${this.base}/${encodeURIComponent(userName)}`).pipe(catchError(this.handleError));
  }

  create(user: UserMaster): Observable<UserMaster> {
    return this.http.post<UserMaster>(this.base, user).pipe(catchError(this.handleError));
  }

  update(userName: string, user: Partial<UserMaster>): Observable<void> {
    return this.http.put<void>(`${this.base}/${encodeURIComponent(userName)}`, user).pipe(catchError(this.handleError));
  }

  softDelete(userName: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${encodeURIComponent(userName)}`).pipe(catchError(this.handleError));
  }

  login(userName: string, password: string): Observable<UserMaster> {
    return this.http.post<UserMaster>(`${this.base}/login`, { userName, password }).pipe(catchError(this.handleError));
  }

  logout(userName: string): Observable<any> {
    return this.http.post<any>(`${this.base}/logout`, { userName }).pipe(catchError(this.handleError));
  }

  // Use an arrow function so "this" is preserved when passed to catchError.
  // Parse common ASP.NET validation response shapes and return a structured error.
  private handleError = (err: any) => {
    console.error('API error', err);

    // Default message
    let message = 'An unknown error occurred';
    const details = err?.error ?? err;

    // ASP.NET validation problem details: { title, status, errors: { Field: [..] } }
    if (err?.error) {
      const server = err.error;

      if (typeof server === 'string') {
        message = server;
      } else if (server?.errors && typeof server.errors === 'object') {
        const parts: string[] = [];
        for (const key of Object.keys(server.errors)) {
          const val = server.errors[key];
          if (Array.isArray(val)) parts.push(...val.map(v => `${key}: ${v}`));
          else parts.push(`${key}: ${val}`);
        }
        message = parts.join('\n');
      } else if (server?.title) {
        message = server.title + (server?.detail ? ` - ${server.detail}` : '');
      } else if (server?.message) {
        message = server.message;
      }
    } else if (err?.message) {
      message = err.message;
    }

    // Throw a structured object so callers can read message and raw details
    return throwError(() => ({ message, details }));
  };
}
