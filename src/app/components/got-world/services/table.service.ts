import { Injectable } from '@angular/core';
import { PageResponse } from 'src/app/api';
import { Character, TableData } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  mapToTableData(
    pageResponse: PageResponse<Character>,
    pageSize: number,
    pageIndex: number,
    lastPageLength: number
  ): TableData {
    const lengthPart = pageResponse.pageParts.last.split('?')[1];
    let match = lengthPart.match(/page=(.*)&pageSize=(.*)/);

    return {
      length: pageSize * (+match[1] - 1) + lastPageLength,
      pageSize: pageSize,
      pageIndex: pageIndex,
      items: pageResponse.body,
    };
  }
}
