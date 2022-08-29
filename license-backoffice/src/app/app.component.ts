import { Component, ViewChild } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  title = 'มหาวิทยาลัยขอนแก่น';
  subtitle = 'Khon Kaen University';

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private storageService: StorageService,
    private authService: AuthService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('dashboard', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Dashboard.svg'));
    iconRegistry.addSvgIcon('license', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Notebook.svg'));
    iconRegistry.addSvgIcon('color', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Colors.svg'));
    iconRegistry.addSvgIcon('type', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Type.svg'));
    iconRegistry.addSvgIcon('speed', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Speed.svg'));
    iconRegistry.addSvgIcon('hour', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Time.svg'));
    iconRegistry.addSvgIcon('day', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Month.svg'));
    iconRegistry.addSvgIcon('month', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Month.svg'));
    iconRegistry.addSvgIcon('user', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/User.svg'));
    iconRegistry.addSvgIcon('logout', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Power.svg'));

  }

  ngOnInit(): void {
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
      },
      error: err => {
        console.log(err);
      }
    });
    window.location.href = "/";
  }
}
