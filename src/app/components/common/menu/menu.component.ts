import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterOutlet, MatToolbar, MatIconModule, MatButtonModule, 
    MatTableModule, CommonModule, MatSidenavModule, MatNavList, MatListModule,
  RouterModule, HttpClientModule, RouterLinkActive, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
 isSideNavOpen = true;
  currentRoute: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // Set initial route
    this.currentRoute = this.router.url;
  }

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

 

  logOut() {
    // Your logout logic here
    console.log('Logging out...');
  }
}
