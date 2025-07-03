import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';

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
  currentRoute: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    // Listen to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        console.log('Current route:', event.url);
        console.log('Masters active:', this.isActive('/masters'));
        console.log('Notification logs active:', this.isActive('/notification-logs'));
      }
    });
  }

  ngOnInit() {
    // Set initial route
    this.currentRoute = this.router.url;
  }

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

  isActive(path: string): boolean {
    const isActive = this.router.url === path || this.router.url.startsWith(path + '/');
    console.log(`Checking if ${path} is active. Current URL: ${this.router.url}, Result: ${isActive}`);
    return isActive;
  }

  logOut() {
    // Your logout logic here
    console.log('Logging out...');
  }
}
