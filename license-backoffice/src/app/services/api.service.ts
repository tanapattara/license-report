import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  HOST_URL = "http://localhost:3000"

  getLicenses() {
    return this.http.get<any>(this.HOST_URL + "/license");
  }

  getColor() {
    return this.http.get<any>(this.HOST_URL + "/data/color");
  }

  getProvince() {
    return this.http.get<any>(this.HOST_URL + "/data/province");
  }
  getBrand() {
    return this.http.get<any>(this.HOST_URL + "/data/brand");
  }
}
