import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterlicenseService {

  event: EventEmitter<null> = new EventEmitter();
  _color: string[] = [];
  _province: string[] = [];
  _location: string[] = [];

  constructor() { }

  _filter: string = "";

  setFilter(filter: string) { this._filter = filter; this.event.emit(); }
  getFilter() { return this._filter }

  setColorData(data: string[]) { this._color = data; }
  setProvinceData(data: string[]) { this._province = data; }
  setLocationData(data: string[]) { this._location = data; }

  getColorData(): string[] { return this._color; }
  getProvinceData(): string[] { return this._province; }
  getLocationData(): string[] { return this._location; }
}
