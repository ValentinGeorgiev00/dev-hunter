import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Developer } from '../models/developer.model';

@Injectable({
  providedIn: 'root',
})
export class DevelopersService {

  constructor(private http: HttpClient) {}
  
  getAll$(): Observable<Developer[]> {
    const queryParams = new HttpParams({
      fromObject: {
        _expand: ['technology', 'location'],
      },
    });
    return this.http.get<Developer[]>(`${environment.baseUrl}developers?`, {
      params: queryParams,
    });
  }

  addDeveloper$(developer: Developer): Observable<Developer> {
    return this.http.post<Developer>(
      `${environment.baseUrl}developers`,
      developer
    );
  }

  updateDeveloper$(developer: Developer): Observable<Developer> {
    return this.http.put<Developer>(
      `${environment.baseUrl}developers/${developer.id}`,
      developer
    );
  }

  getOneDeveloper(id: number): Observable<Developer> {
    return this.http.get<Developer>(`${environment.baseUrl}developers/${id}`);
  }

  deleteDeveloper$(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}developers/${id}`);
  }
}
