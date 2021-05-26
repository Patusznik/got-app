import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { House } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HousesService {
  private path = `${environment.apiUrl}/houses`;

  constructor(private http: HttpClient) {}

  getHouse(id: string): Observable<House> {
    return this.http.get<House>(`${this.path}/${id}`);
  }
}
