import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { HousesService } from 'src/app/api/houses.service';
import { House } from 'src/app/models';

@Injectable({ providedIn: 'root' })
export class HouseResolver implements Resolve<House> {
  constructor(private service: HousesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<House> {
    return this.service.getHouse(route.paramMap.get('id'));
  }
}
