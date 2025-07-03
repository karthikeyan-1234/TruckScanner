import { CommonModule } from '@angular/common';
import { Component,ComponentFactoryResolver, ViewChild, ViewContainerRef, OnInit, Type } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { TruckComponent } from './truck/truck.component';
import { TyreComponent } from './tyre/tyre.component';
import { TruckTyreMapComponent } from './truck-tyre-map/truck-tyre-map.component';

@Component({
  selector: 'app-masters',
  imports: [MatButtonModule,MatTabsModule,CommonModule],
  templateUrl: './masters.component.html',
  styleUrl: './masters.component.css'
})
export class MastersComponent {

  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  dynamicContainer!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  links = [
    { label: 'Trucks', component: TruckComponent },
    { label: 'Tyres', component: TyreComponent },
    { label: 'Truck Tyre Map', component: TruckTyreMapComponent }
  ];

  activeLink: string = '';

  ngOnInit() {
    // Optionally load the first tab by default
    this.loadComponent(0);
  }

  loadComponent(index: number) {
    const componentY = this.links[index].component as Type<any>;

    // Clear the container
    this.dynamicContainer.clear();

    // Create the component
    const factory = this.resolver.resolveComponentFactory(componentY);
    this.dynamicContainer.createComponent(factory);

    // Set active link
    this.activeLink = this.links[index].label;
  }

}
