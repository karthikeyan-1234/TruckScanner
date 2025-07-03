import { Routes } from '@angular/router';
import { UploadComponent } from './components/upload/upload.component';
import { MastersComponent } from './components/masters/masters.component';
import { TruckComponent } from './components/masters/truck/truck.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

export const routes: Routes = [
    {
        path: 'upload',
        component: UploadComponent
    },
    {
        path: 'masters',
        component: MastersComponent
    },
    {
        path: 'masters/truck',
        component: TruckComponent
    },
    {
        path: 'notification-logs',
        component: NotificationsComponent
    }
];
