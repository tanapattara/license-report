import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = API_URL;

  constructor(private http: HttpClient) { }
  getPublicContent(): Observable<any> {
    return this.http.get(this.API_URL + 'all', { responseType: 'text' });
  }
  getUserBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'user', { responseType: 'text' });
  }
  getModeratorBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'mod', { responseType: 'text' });
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'admin', { responseType: 'text' });
  }
}
