// src/app/services/signalr.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject, Observable } from 'rxjs';
import { LogUpdateNotification } from '../models/log-update-notification';


@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection; // Use definite assignment assertion
  private logUpdateSubject = new Subject<LogUpdateNotification>();
  public logUpdate$: Observable<LogUpdateNotification> = this.logUpdateSubject.asObservable();

  constructor() {
    this.startConnection();
  }

  private startConnection = () => {
    const hubUrl = 'https://localhost:7272/messagehub';

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true 
      })
      .withAutomaticReconnect([0,1000,10000])
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connection started successfully.');
        this.addReceiveLogStatusUpdateListener();
      })
      .catch(err => console.error('Error while starting SignalR connection: ', err));

    // Optional: Log connection state changes
    this.hubConnection.onreconnecting(error => {
      console.warn('SignalR: Reconnecting...', error);
    });

    this.hubConnection.onreconnected(connectionId => {
      console.log(`SignalR: Reconnected. New connection ID: ${connectionId}`);
      this.addReceiveLogStatusUpdateListener(); // Re-add listeners on reconnect
    });

    this.hubConnection.onclose(error => {
      console.error('SignalR: Connection closed.', error);
      // If not using automatic reconnect, you might want to call startConnection() again here
    });
  }

  // Method to add the listener for the server-side method "ReceiveLogStatusUpdate"
  private addReceiveLogStatusUpdateListener = () => {
    this.hubConnection.on('ReceiveLogStatusUpdate', (data: LogUpdateNotification) => {
      console.log('Received Log Update Notification:', data);
      this.logUpdateSubject.next(data); // Push the data to subscribers
    });
  }

  // Optional: Stop the connection when the service is destroyed (e.g., app closes)
  public stopConnection(): void {
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.stop()
        .then(() => console.log('SignalR connection stopped.'))
        .catch(err => console.error('Error while stopping SignalR connection: ', err));
    }
  }
}