import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterOutlet, MatToolbar, MatIconModule, MatButtonModule, 
    MatTableModule, CommonModule, MatSidenavModule, MatNavList, MatListModule,
  RouterModule,HttpClientModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  isSideNavOpen = true;

  constructor(private router: Router, private route: ActivatedRoute){}

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

  selectedMenuItem: string = ''; // Track the currently selected menu item

  selectMenuItem(menuItem: string) {
    this.selectedMenuItem = menuItem;
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  logOut(){}

}
