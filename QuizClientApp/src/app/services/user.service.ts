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

  constructor(private http: HttpClient) {}

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

  private handleError(err: any) {
    console.error(err);
    return throwError(() => err);
  }
}