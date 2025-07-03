import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TruckTyreMap } from '../models/truck-tyre-map';

@Injectable({
  providedIn: 'root'
})
export class TruckTyreMapService {

  private apiUrl = 'https://localhost:7272/api/TruckTyreMap';

  constructor(private http: HttpClient) { }

  getAllTruckTyreMaps():Observable<TruckTyreMap[]> {
    return this.http.get<TruckTyreMap[]>(`${this.apiUrl}/GetAllTruckTyreMapsAsync`);
  }
}
