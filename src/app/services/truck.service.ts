import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Truck } from '../models/truck';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TruckService {

  private apiUrl = 'https://localhost:7272/api/Truck';

  constructor(private http: HttpClient) { }

  getAllTrucks():Observable<Truck[]> {
    return this.http.get<Truck[]>(`${this.apiUrl}/GetAllTrucksAsync`);
  }

  addTruck(truck: Truck): Observable<Truck> {
    return this.http.post<Truck>(`${this.apiUrl}/AddTruckAsync`, truck);
  }

  deleteTruck(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteTruckAsync/${id}`);
  }

  updateTruck(id: number, truck: Truck): Observable<Truck> {
    return this.http.put<Truck>(`${this.apiUrl}/UpdateTruckAsync/${id}`, truck);
  }
}
