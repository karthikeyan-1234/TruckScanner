import { Component, VERSION } from '@angular/core';
import { MatToolbar,MatToolbarModule  } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/common/menu/menu.component';
import { LogUpdateNotification } from './models/log-update-notification';
import { Subscription } from 'rxjs';
import { SignalrService } from './services/signalr.service';

@Component({
  selector: 'app-root',
  imports: [MatIconModule, MatButtonModule,
    MatTableModule, CommonModule, MatSidenavModule, MatListModule,
    RouterModule, MatToolbarModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TruckScanner';
  isSideNavOpen = true;
  constructor(private router: Router) {  }

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

  logOut(): void {
    console.log('Logging out');    
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
