// src/app/models/log-update-notification.model.ts

export interface LogUpdateNotification {
  logId: number;
  truckRegistrationNo: string;
  tyreRfId: string;
  status: number; // 0 for mismatch, 1 for match
  message: string;
  timestamp: Date; // This will be a string from C#, you might parse it if needed
}
