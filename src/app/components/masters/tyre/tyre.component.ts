import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { TyreService } from '../../../services/tyre.service';
import { Tyre } from '../../../models/tyre';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-tyre',
  imports: [MatTableModule, MatIconModule, MatProgressSpinnerModule,CommonModule],
  templateUrl: './tyre.component.html',
  styleUrl: './tyre.component.css'
})
export class TyreComponent {

@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;


  onUploadClick() {
      // Trigger the hidden file input click
      this.fileInput.nativeElement.click();
    
  }

  tyres: Tyre[] = [];
  dataSource: MatTableDataSource<Tyre> | undefined;
  displayedColumns: string[] = ['id', 'tyreRfId', 'manufacturer', 'model', 'createdAt'];

    // Loading state for upload
  isUploading = false;
  selectedFile: File | null = null;
  private snackBar = inject(MatSnackBar);

  constructor(private tyreService: TyreService) { }


  ngOnInit() {
    this.loadTyres();
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

  loadTyres() {
    this.tyreService.getAllTyres().subscribe(
      (data) => {
        console.log('Tyres fetched successfully:', data);
        this.tyres = data;
        this.dataSource = new MatTableDataSource(data);
      },
      (error) => {
        console.error('Error fetching tyres:', error);
        this.snackBar.open('Error loading tyres', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
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


  private uploadFile(file: File): void {
    this.isUploading = true;
    
    // Create FormData to send the file
    const formData = new FormData();
    formData.append('file', file);
    
    // Optional: Add additional metadata if needed
    // formData.append('uploadedBy', 'currentUserId');
    // formData.append('uploadDate', new Date().toISOString());

    this.tyreService.uploadTyreData(formData).subscribe({
      next: (response) => {
        console.log('File uploaded successfully:', response);
        this.isUploading = false;
        
        // Show success message
        const message = response.message || 'File uploaded and processed successfully';
        this.snackBar.open(message, 'Close', {
          duration: 4000,
          panelClass: ['success-snackbar']
        });

        // Reload the tyres data to reflect changes
        this.loadTyres();
        
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
}
