import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {

  constructor(private http: HttpClient) {}
  
  getAll$(): Observable<Location[]> {
    const queryParams = new HttpParams({
      fromObject: {
        _embed: ['developers'],
      },
    });
    return this.http.get<Location[]>(`${environment.baseUrl}locations?`, {
      params: queryParams,
    });
  }

  addLocation$(location: Location): Observable<Location> {
    return this.http.post<Location>(
      `${environment.baseUrl}locations`,
      location
    );
  }

  updateLocation$(location: Location): Observable<Location> {
    return this.http.put<Location>(
      `${environment.baseUrl}locations/${location.id}`,
      location
    );
  }

  getOneLocation(id: number): Observable<Location> {
    return this.http.get<Location>(`${environment.baseUrl}locations/${id}`);
  }

  deleteLocation$(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}locations/${id}`);
  }
}
