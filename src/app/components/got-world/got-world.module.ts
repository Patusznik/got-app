import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { AlivePipe } from 'src/app/pipes';

import { CharactersTableComponent } from './characters-table';
import { GotWorldComponent } from './got-world.component';
import { HouseResolver, HousesComponent } from './houses';

const routes: Routes = [
  {
    path: '',
    component: GotWorldComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'characters',
      },

      {
        path: 'characters',
        component: CharactersTableComponent,
      },

      {
        path: 'houses/:id',
        component: HousesComponent,
        resolve: {
          house: HouseResolver,
        },
      },
    ],
  },
];
@NgModule({
  declarations: [
    GotWorldComponent,
    AlivePipe,
    CharactersTableComponent,
    HousesComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    //material
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class GotWorldModule {}
