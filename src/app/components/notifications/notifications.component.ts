import { Component } from '@angular/core';
import { LogUpdateNotification } from '../../models/log-update-notification';
import { Subscription } from 'rxjs';
import { SignalrService } from '../../services/signalr.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-notifications',
  imports: [MatTableModule, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  notifications: LogUpdateNotification[] = [];
  private notificationSubscription: Subscription;

  //Table to display notifications
  displayedColumns: string[] = ['logId', 'truckRegistrationNo', 'tyreRfId', 'message', 'timestamp'];
  dataSource = new MatTableDataSource<LogUpdateNotification>(this.notifications);

  constructor(private signalrService: SignalrService, private logService: LogService) {

    this.refreshLogs();

    this.notificationSubscription = this.signalrService.logUpdate$.subscribe(
      (notification) => {
        console.log('Received notification:', notification);
        this.notifications.push(notification);
        this.refreshLogs();
      }
    );



  }


  refreshLogs(){
    this.logService.getallLogs().subscribe(
        (data) => {

          console.log('Notifications fetched successfully:', data);

          this.notifications = data;
          this.dataSource.data = this.notifications;
        }
      );
  }

}
