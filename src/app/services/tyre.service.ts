import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tyre } from '../models/tyre';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TyreService {

  private apiUrl = 'https://localhost:7272/api/Tyre';

  constructor(private http: HttpClient) { }

  getAllTyres(): Observable<Tyre[]> {
    return this.http.get<Tyre[]>(`${this.apiUrl}/GetAllTyresAsync`);
  }

  addTyre(tyre: Tyre): Observable<Tyre> {
    return this.http.post<Tyre>(`${this.apiUrl}/AddTyreAsync`, tyre);
  }

  deleteTyre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tyres/${id}`);
  }

  updateTyre(id: number, tyre: Tyre): Observable<Tyre> {
    return this.http.put<Tyre>(`${this.apiUrl}/tyres/${id}`, tyre);
  }

  getTyreById(id: number): Observable<Tyre> {
    return this.http.get<Tyre>(`${this.apiUrl}/tyres/${id}`);
  }
}
