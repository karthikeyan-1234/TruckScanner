import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { TruckService } from '../../../services/truck.service';
import { Truck } from '../../../models/truck';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { AddEditComponent } from "./add-edit/add-edit.component";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-truck',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatDialogModule
],
  templateUrl: './truck.component.html',
  styleUrl: './truck.component.css'
})
export class TruckComponent {

  SidebarOpen: boolean = false;


deleteTruck(arg0: any) {
throw new Error('Method not implemented.');
}



@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  private snackBar = inject(MatSnackBar);
  
  trucks: Truck[] = [];
  dataSource: MatTableDataSource<Truck> | undefined;
  displayedColumns: string[] = ['id', 'registrationNo', 'createdAt', 'actions'];
  
  // Loading state for upload
  isUploading = false;
  selectedFile: File | null = null;
  editedTruck: Truck | null = null;

  constructor(private truckService: TruckService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadTrucks();
  }

  loadTrucks() {
    this.truckService.getAllTrucks().subscribe(
      (data) => {
        console.log('Trucks fetched successfully:', data);
        this.trucks = data;
        this.dataSource = new MatTableDataSource(data);
      },
      (error) => {
        console.error('Error fetching trucks:', error);
        this.snackBar.open('Error loading trucks', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }


  //#region  file upload methods

  onUploadClick() {
    // Trigger the hidden file input click
    this.fileInput.nativeElement.click();
  }

  // This method is called when the hidden file input's value changes (i.e., a file is selected)
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validate file type
      if (!this.isValidExcelFile(file)) {
        this.snackBar.open('Please select a valid Excel file (.xlsx or .xls)', 'Close', {
          duration: 4000,
          panelClass: ['error-snackbar']
        });
        return;
      }

      // Validate file size (optional - adjust as needed)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        this.snackBar.open('File size must be less than 10MB', 'Close', {
          duration: 4000,
          panelClass: ['error-snackbar']
        });
        return;
      }

      this.selectedFile = file;
      this.uploadFile(file);
    }
  }

  private isValidExcelFile(file: File): boolean {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel' // .xls
    ];
    
    const allowedExtensions = ['.xlsx', '.xls'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    return allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension);
  }

  private uploadFile(file: File): void {
    this.isUploading = true;
    
    // Create FormData to send the file
    const formData = new FormData();
    formData.append('file', file);
    
    // Optional: Add additional metadata if needed
    // formData.append('uploadedBy', 'currentUserId');
    // formData.append('uploadDate', new Date().toISOString());

    this.truckService.uploadTruckData(formData).subscribe({
      next: (response) => {
        console.log('File uploaded successfully:', response);
        this.isUploading = false;
        
        // Show success message
        const message = response.message || 'File uploaded and processed successfully';
        this.snackBar.open(message, 'Close', {
          duration: 4000,
          panelClass: ['success-snackbar']
        });
        
        // Reload the trucks data to reflect changes
        this.loadTrucks();
        
        // Reset the file input
        this.resetFileInput();
      },
      error: (error) => {
        console.error('Error uploading file:', error);
        this.isUploading = false;
        
        // Show error message
        const errorMessage = error.error?.message || 'Failed to upload file. Please try again.';
        this.snackBar.open(errorMessage, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        
        // Reset the file input
        this.resetFileInput();
      }
    });
  }

  private resetFileInput(): void {
    this.fileInput.nativeElement.value = '';
    this.selectedFile = null;
  }

  //#endregion



  editTruck(truck: Truck) {
    console.log('Editing truck:', truck);
    // Logic to open the edit sidebar or dialog
    this.openRightSideDialog(truck, 'edit');
  }

  addTruck() {
    // Open the add dialog from the right side
    this.openRightSideDialog(null, 'add');
  }

  private openRightSideDialog(truck: Truck | null, mode: string) {
  const dialogRef = this.dialog.open(AddEditComponent, {
    width: '350px',
    height: '100vh',
    maxWidth: '450px',
    maxHeight: '100vh',
    position: { right: '0' },
    panelClass: ['right-side-dialog'],
    hasBackdrop: true,
    backdropClass: 'right-side-backdrop',
    disableClose: true, // Prevent closing on backdrop click
    data: {
      truck: truck,
      mode: mode
    }
  });

  // Handle dialog close
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Dialog closed with result:', result);
      // Reload trucks if data was modified
      this.loadTrucks();
    }
  });
}
}