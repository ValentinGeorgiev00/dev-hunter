import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Technology } from '../models/technology.model';

@Injectable({
  providedIn: 'root',
})
export class TechnologiesService {
  constructor(private http: HttpClient) {}

  getAll$(): Observable<Technology[]> {
    const queryParams = new HttpParams({
      fromObject: {
        _embed: ['developers'],
      },
    });
    return this.http.get<Technology[]>(`${environment.baseUrl}technologies`, {
      params: queryParams,
    });
  }

  addTechnology$(technology: Technology): Observable<Technology> {
    return this.http.post<Technology>(
      `${environment.baseUrl}technologies`,
      technology
    );
  }

  updateTechnology$(technology: Technology): Observable<Technology> {
    return this.http.put<Technology>(
      `${environment.baseUrl}technologies/${technology.id}`,
      technology
    );
  }

  getOneTechnology(id: number): Observable<Technology> {
    return this.http.get<Technology>(
      `${environment.baseUrl}technologies/${id}`
    );
  }

  deleteTechnology$(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}technologies/${id}`);
  }
}
