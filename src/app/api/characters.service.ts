import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Character } from '../models';
import { PageParams } from './models';
import { PageParts, PageResponse } from './models/page-response';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private path = `${environment.apiUrl}/characters/`;

  constructor(private http: HttpClient) {}

  getCharactersPage({
    page,
    pageSize,
    gender,
    culture,
  }: PageParams): Observable<PageResponse<Character>> {
    const genderParam = !!gender ? `&gender=${gender}` : ``;
    const cultureParam = !!culture ? `&culture=${culture}` : ``;
    const params = new HttpParams({
      fromString: `page=${page}&pageSize=${pageSize}${genderParam}${cultureParam}`,
    });

    return this.http
      .get<Character[]>(this.path, {
        params,
        observe: 'response',
      })
      .pipe(
        map(({ headers, body }: HttpResponse<Character[]>) => {
          const pageParts: PageParts = this.getLinkParts(headers);
          return {
            body,
            pageParts,
          };
        })
      );
  }

  private getLinkParts(headers: HttpHeaders): PageParts {
    let linkHeaders = headers.get('link');
    return linkHeaders?.split(',').reduce((acc, link) => {
      let match = link.match(/<(.*)>; rel="(\w*)"/);
      let url = match[1];
      let rel = match[2];
      acc[rel] = url;
      return acc;
    }, {});
  }
}
