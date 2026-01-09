import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { OrganizationMaster } from '../models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private base = `${environment.apiUrl}/OrganizationMaster`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<OrganizationMaster[]> {
    return this.http.get<OrganizationMaster[]>(this.base).pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<OrganizationMaster> {
    return this.http.get<OrganizationMaster>(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }

  getByRegNo(regNo: string): Observable<OrganizationMaster> {
    return this.http.get<OrganizationMaster>(`${this.base}/ByRegNo/${encodeURIComponent(regNo)}`).pipe(catchError(this.handleError));
  }
  getByRegNoPwd(regNo: string, pwd: string): Observable<OrganizationMaster> {
    return this.http.get<OrganizationMaster>(`${this.base}/ByRegNo/${encodeURIComponent(regNo)}`).pipe(catchError(this.handleError));
  }
  getByName(name: string): Observable<OrganizationMaster> {
    return this.http.get<OrganizationMaster>(`${this.base}/ByName/${encodeURIComponent(name)}`).pipe(catchError(this.handleError));
  }

  create(org: OrganizationMaster): Observable<OrganizationMaster> {
    return this.http.post<OrganizationMaster>(this.base, org).pipe(catchError(this.handleError));
  }

  update(id: number, org: OrganizationMaster): Observable<void> {
    return this.http.put<void>(`${this.base}/${id}`, org).pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    console.error(err);
    return throwError(() => err);
  }
}
