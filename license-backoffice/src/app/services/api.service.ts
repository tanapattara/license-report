import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChannelFilter, Filter } from '../model/Filter';
import { License } from '../model/license';
import { API_URL } from './config';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  HOST_URL = API_URL;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  getLicenses() {
    return this.http.get<any>(this.HOST_URL + '/license');
  }

  updateLicense(data: any): Observable<any> {
    return this.http.put(API_URL + '/license', data, this.httpOptions);
  }

  getPeopleWithFilter(filter: ChannelFilter) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append(
      'startdate',
      filter.startDate ? this.getSaveDateFormat(filter.startDate) : 'All'
    );
    queryParams = queryParams.append(
      'enddate',
      filter.endDate ? this.getSaveNextDateFormat(filter.endDate) : 'All'
    );
    queryParams = queryParams.append('channel', filter.channel);

    return this.http.get<any>(this.HOST_URL + '/people', {
      params: queryParams,
    });
  }
  getLicensesWithFilter(filter: Filter) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('color', filter.color || 'All');
    queryParams = queryParams.append('province', filter.province || 'All');
    queryParams = queryParams.append('location', filter.place || 'All');
    queryParams = queryParams.append('licno', filter.license || 'All');

    queryParams = queryParams.append(
      'startdate',
      filter.startDate ? this.getSaveDateFormat(filter.startDate) : 'All'
    );
    queryParams = queryParams.append(
      'enddate',
      filter.endDate ? this.getSaveNextDateFormat(filter.endDate) : 'All'
    );

    queryParams = queryParams.append('minspeed', filter.minSpeed || 'All');
    queryParams = queryParams.append('maxspeed', filter.maxSpeed || 'All');

    queryParams = queryParams.append('starthour', filter.startHour || 'All');
    queryParams = queryParams.append('endhour', filter.endHour || 'All');

    return this.http.get<any>(this.HOST_URL + '/filter', {
      params: queryParams,
    });
  }
  getSaveDateFormat(d: Date): string {
    let sReturn = '';
    let n = new Date(d.getTime());
    sReturn =
      n.getFullYear() +
      '-' +
      this.get2DigitZeroPad(n.getMonth() + 1) +
      '-' +
      this.get2DigitZeroPad(n.getDate());
    return sReturn;
  }
  getSaveNextDateFormat(d: Date): string {
    let n = new Date(d.getTime());
    n.setDate(n.getDate() + 1);
    let sReturn = '';
    sReturn =
      n.getFullYear() +
      '-' +
      this.get2DigitZeroPad(n.getMonth() + 1) +
      '-' +
      this.get2DigitZeroPad(n.getDate());
    return sReturn;
  }
  get2DigitZeroPad(data: any): string {
    let str = '' + data;
    let pad = '00';
    let ans = pad.substring(0, pad.length - str.length) + str;
    return ans;
  }

  getColor() {
    return this.http.get<any>(this.HOST_URL + '/color');
  }

  getProvince() {
    return this.http.get<any>(this.HOST_URL + '/province');
  }
  getLocation() {
    return this.http.get<any>(this.HOST_URL + '/location');
  }
}
