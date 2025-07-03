import { Component } from '@angular/core';
import { TruckService } from '../../../services/truck.service';
import { Truck } from '../../../models/truck';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar'; // For user feedback


@Component({
  selector: 'app-truck',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './truck.component.html',
  styleUrl: './truck.component.css'
})
export class TruckComponent {

  private snackBar!: MatSnackBar // Inject MatSnackBar for notifications

  onUploadClick() {
    
  }

  // This method is called when the hidden file input's value changes (i.e., a file is selected)
  onFileSelected(event: Event): void {
  }

  trucks: Truck[] = [];
  dataSource: MatTableDataSource<Truck> | undefined;
  displayedColumns: string[] = ['id', 'registrationNo', 'createdAt'];

  constructor(private truckService: TruckService) { }

  ngOnInit() {
    this.loadTrucks();
  }

  loadTrucks() {
    this.truckService.getAllTrucks().subscribe(
      (data) => {
        console.log('Trucks fetched successfully:', data);
        this.dataSource = new MatTableDataSource(data);
      },
      (error) => {
        console.error('Error fetching trucks:', error);
      }
    );
  }
}
