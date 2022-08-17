import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const APIURL = API_URL + '/api/test/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<any> {
    return this.http.get(API_URL + '/user', httpOptions);
  }
}
