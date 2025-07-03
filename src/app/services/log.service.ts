import { Injectable } from '@angular/core';
import { LogUpdateNotification } from '../models/log-update-notification';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private apiUrl = 'https://localhost:7272/api/Notification';

  constructor(private http: HttpClient) { }

  getallLogs(): Observable<LogUpdateNotification[]> {
    return this.http.get<LogUpdateNotification[]>(`${this.apiUrl}/GetAllNotificationsAsync`);
  }
}
