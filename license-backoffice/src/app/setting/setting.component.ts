import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
  lang: string = 'th';
  @ViewChild('languageSelection') languageSelection!: MatSelect;

  constructor(
    private localStore: LocalService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.lang =
      this.localStore.getData('lang') == null
        ? 'th'
        : this.localStore.getData('lang')!;
  }
  save(): void {
    this.lang = this.languageSelection.value;
    this.localStore.saveData('lang', this.lang);
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
  }
}
