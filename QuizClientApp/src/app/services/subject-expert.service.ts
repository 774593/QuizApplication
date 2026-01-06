import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SubExpert } from '../models/sub-expert.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectExpertService {
  private base = `${environment.apiUrl}/SubjectExpert`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SubExpert[]> {
    return this.http.get<SubExpert[]>(this.base).pipe(catchError(this.handleError));
  }

  getByRegNo(regNo: string): Observable<SubExpert> {
    return this.http.get<SubExpert>(`${this.base}/${encodeURIComponent(regNo)}`).pipe(catchError(this.handleError));
  }

  getByEmail(email: string): Observable<SubExpert> {
    return this.http.get<SubExpert>(`${this.base}/ByEmail/${encodeURIComponent(email)}`).pipe(catchError(this.handleError));
  }

  searchByExpertise(term: string): Observable<SubExpert[]> {
    const params = new HttpParams().set('expertise', term);
    return this.http.get<SubExpert[]>(`${this.base}/Search`, { params }).pipe(catchError(this.handleError));
  }

  create(expert: SubExpert): Observable<SubExpert> {
    return this.http.post<SubExpert>(this.base, expert).pipe(catchError(this.handleError));
  }

  update(regNo: string, expert: Partial<SubExpert>): Observable<void> {
    return this.http.put<void>(`${this.base}/${encodeURIComponent(regNo)}`, expert).pipe(catchError(this.handleError));
  }

  delete(regNo: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${encodeURIComponent(regNo)}`).pipe(catchError(this.handleError));
  }

  authenticate(regOrEmail: string, password: string): Observable<SubExpert> {
    return this.http.post<SubExpert>(`${this.base}/Authenticate`, { regNoOrEmail: regOrEmail, password }).pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    console.error(err);
    return throwError(() => err);
  }
}