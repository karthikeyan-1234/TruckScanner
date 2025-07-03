import { Component } from '@angular/core';
import { TyreService } from '../../../services/tyre.service';
import { Tyre } from '../../../models/tyre';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule, MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-tyre',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './tyre.component.html',
  styleUrl: './tyre.component.css'
})
export class TyreComponent {
onUploadClick() {
  //Show file upload dialog or handle file upload logic here
  
}

  tyres: Tyre[] = [];
  dataSource: MatTableDataSource<Tyre> | undefined;
  displayedColumns: string[] = ['id', 'tyreRfId', 'manufacturer', 'model', 'createdAt'];

  constructor(private tyreService: TyreService) { }


  ngOnInit() {
    this.loadTyres();
  }

  loadTyres() {
    this.tyreService.getAllTyres().subscribe(
      (data) => {
        console.log('Tyres fetched successfully:', data);
        this.dataSource = new MatTableDataSource(data);
      },
      (error) => {
        console.error('Error fetching tyres:', error);
      }
    );
  }
}
