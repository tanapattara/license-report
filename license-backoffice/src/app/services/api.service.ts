import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from './config';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  HOST_URL = API_URL;

  getLicenses() {
    return this.http.get<any>(this.HOST_URL + "/license");
  }

  getColor() {
    return this.http.get<any>(this.HOST_URL + "/color");
  }

  getProvince() {
    return this.http.get<any>(this.HOST_URL + "/province");
  }
  getLocation() {
    return this.http.get<any>(this.HOST_URL + "/location");
  }
}
