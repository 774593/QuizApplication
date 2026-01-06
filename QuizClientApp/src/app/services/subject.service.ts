import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SubjectMaster } from '../models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private base = `${environment.apiUrl}/SubjectMaster`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SubjectMaster[]> {
    return this.http.get<SubjectMaster[]>(this.base).pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<SubjectMaster> {
    return this.http.get<SubjectMaster>(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }

  getByName(name: string): Observable<SubjectMaster> {
    return this.http.get<SubjectMaster>(`${this.base}/ByName/${encodeURIComponent(name)}`).pipe(catchError(this.handleError));
  }

  create(subject: SubjectMaster): Observable<SubjectMaster> {
    return this.http.post<SubjectMaster>(this.base, subject).pipe(catchError(this.handleError));
  }

  update(id: number, subject: SubjectMaster): Observable<void> {
    return this.http.put<void>(`${this.base}/${id}`, subject).pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    console.error(err);
    return throwError(() => err);
  }
}