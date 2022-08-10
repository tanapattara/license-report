import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterlicenseService {

  event: EventEmitter<null> = new EventEmitter();

  constructor() { }

  _filter: string = "";

  setFilter(filter: string) { this._filter = filter; this.event.emit(); }
  getFilter() { return this._filter }
}
