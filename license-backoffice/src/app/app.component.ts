import { Component, ViewChild } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { TranslateService } from '@ngx-translate/core';
import { LocalService } from './services/local.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'มหาวิทยาลัยขอนแก่น';
  subtitle = 'Khon Kaen University';
  constructor(
    private translate: TranslateService,
    private localStore: LocalService
  ) {
    var lang = localStore.getData('lang');
    if (lang == null) {
      lang = 'th';
      localStore.saveData('lang', lang);
    }
    translate.setDefaultLang(lang);
    translate.use(lang);
  }
}
