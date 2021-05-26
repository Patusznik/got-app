import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CharactersService } from 'src/app/api/characters.service';

import { CharactersTableComponent } from './characters-table.component';

describe('CharactersComponent', () => {
  let component: CharactersTableComponent;
  let fixture: ComponentFixture<CharactersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharactersTableComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: CharactersService,
          useValue: { getCharactersPage: { of: null } },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make request for characters page', () => {
    const compSpy = spyOn<any>(component, 'getCharactersPage');
    component.ngAfterViewInit();
    fixture.detectChanges();

    expect(compSpy).toHaveBeenCalled();
  });
});
