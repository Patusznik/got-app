import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, map, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { CharactersService, PageResponse } from 'src/app/api';
import { Character, Gender } from 'src/app/models';

import { TableService } from '../services';

@Component({
  selector: 'app-characters-table',
  templateUrl: './characters-table.component.html',
  styleUrls: ['./characters-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  get tableData(): Observable<Character[]> {
    return this._tableData;
  }

  displayedColumns: string[] = [
    'Character',
    'Alive',
    'Gender',
    'Culture',
    'Allegiances',
    '# of Books',
  ];
  genders = Object.values(Gender);
  pageSize = 25;
  pageIndex = 0;
  resultLength = 0;

  gender: FormControl = new FormControl(null);
  culture: FormControl = new FormControl('');
  private _tableData: Observable<Character[]>;

  constructor(
    private tableService: TableService,
    private charactersService: CharactersService
  ) {}

  ngAfterViewInit() {
    const cultureFilter: Observable<string> = this.culture.valueChanges.pipe(
      startWith(''),
      debounceTime(400)
    );
    const genderFilter: Observable<string> = this.gender.valueChanges.pipe(
      startWith('')
    );
    const pageEvent: Observable<unknown> = this.paginator?.page.pipe(
      startWith({})
    );
    console.log('hejo');
    this._tableData = this.getCharactersPage(
      cultureFilter,
      genderFilter,
      pageEvent
    );
  }

  private getCharactersPage(
    cultureFilter: Observable<string>,
    genderFilter: Observable<string>,
    pageEvent: Observable<unknown>
  ): Observable<Character[]> {
    console.log('characters');
    return combineLatest(cultureFilter, genderFilter, pageEvent).pipe(
      switchMap(([culture, gender, _]) => {
        console.log('bla', this.paginator.pageIndex);
        return this.charactersService
          .getCharactersPage({
            page: `${this.paginator.pageIndex + 1}`,
            pageSize: `${this.paginator.pageSize}`,
            culture,
            gender,
          })
          .pipe(
            mergeMap((response: PageResponse<Character>) => {
              const lengthPart = response.pageParts.last.split('?')[1];
              let match = lengthPart.match(/page=(.*)&pageSize=(.*)/);
              return this.charactersService
                .getCharactersPage({
                  page: match[1],
                  pageSize: `${this.paginator.pageSize}`,
                  culture,
                  gender,
                })
                .pipe(
                  map((lastPageResponse: PageResponse<Character>) => {
                    const result = this.tableService.mapToTableData(
                      response,
                      this.paginator.pageSize,
                      this.paginator.pageIndex,
                      lastPageResponse.body.length
                    );
                    this.resultLength = result.length;
                    this.pageIndex = result.pageIndex;
                    this.pageSize = result.pageSize;

                    return result.items;
                  })
                );
            })
          );
      })
    );
  }

  getHouseId(link: string): string {
    return link.match(/[0-9]+/)[0];
  }
}
