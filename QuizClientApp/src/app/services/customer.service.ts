import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CustomerMaster } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private base = `${environment.apiUrl}/CustomerMaster`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CustomerMaster[]> {
    return this.http.get<CustomerMaster[]>(this.base).pipe(catchError(this.handleError));
  }

  getByEmail(email: string): Observable<CustomerMaster> {
    return this.http.get<CustomerMaster>(`${this.base}/ByEmail/${encodeURIComponent(email)}`).pipe(catchError(this.handleError));
  }

  getByMobile(mobile: string): Observable<CustomerMaster> {
    return this.http.get<CustomerMaster>(`${this.base}/ByMobile/${encodeURIComponent(mobile)}`).pipe(catchError(this.handleError));
  }

  searchByName(name: string): Observable<CustomerMaster[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<CustomerMaster[]>(`${this.base}/Search`, { params }).pipe(catchError(this.handleError));
  }

  create(customer: CustomerMaster): Observable<CustomerMaster> {
    return this.http.post<CustomerMaster>(this.base, customer).pipe(catchError(this.handleError));
  }

  update(email: string, customer: CustomerMaster): Observable<void> {
    return this.http.put<void>(`${this.base}/${encodeURIComponent(email)}`, customer).pipe(catchError(this.handleError));
  }

  deleteByEmail(email: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${encodeURIComponent(email)}`).pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    console.error(err);
    return throwError(() => err);
  }
}