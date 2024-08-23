import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendHelperService {
  private API_URL: string = "https://alviapi.ddns.net";

  constructor(private http: HttpClient) { }

  post(url: string, data: any): Observable<any> {
    return this.http.post<any>(this.API_URL + url, data);
  }

  get(url: string): Observable<any> {
    return this.http.get<any>(this.API_URL + url);
  }
}
