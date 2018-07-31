import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
]
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:3000/api/url/";
  }

  enshort(url: string): Observable<Object> {
    const apiUrl = this.baseUrl + 'shortify';

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(apiUrl, { url }, httpOptions);
  }

  delete(url: string): Observable<Object> {
    const apiUrl = this.baseUrl + 'shortify';

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ url })
    };

    return this.http.delete(apiUrl, httpOptions);
  }

  stats(url: string) {
    const apiUrl = this.baseUrl + 'status';

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(apiUrl, { url }, httpOptions);
  }
}
