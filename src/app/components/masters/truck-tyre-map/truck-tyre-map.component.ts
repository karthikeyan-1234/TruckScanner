import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TruckTyreMapService } from '../../../services/truck-tyre-map.service';
import { TruckTyreMap } from '../../../models/truck-tyre-map';
import { MatIcon, MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-truck-tyre-map',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './truck-tyre-map.component.html',
  styleUrl: './truck-tyre-map.component.css'
})
export class TruckTyreMapComponent {
onFileSelected($event: Event) {
throw new Error('Method not implemented.');
}
onUploadClick() {
}

    trucks: TruckTyreMap[] = [];
    dataSource: MatTableDataSource<TruckTyreMap> | undefined;
    displayedColumns: string[] = ['id', 'truckId', 'tyreId',  'mappedAt'];

    constructor(private truckTyreMapService: TruckTyreMapService) { }

    ngOnInit() {
    this.loadMappings();
  }

  loadMappings() {
    this.truckTyreMapService.getAllTruckTyreMaps().subscribe(
      (data) => {
        console.log('Mappings fetched successfully:', data);
        this.dataSource = new MatTableDataSource(data);
      },
      (error) => {
        console.error('Error fetching mappings:', error);
      }
    );
  }

}
