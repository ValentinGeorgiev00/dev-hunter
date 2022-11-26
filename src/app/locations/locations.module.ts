import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LocationsComponent } from './locations.component';
import { LocationsEditComponent } from './locations-edit/locations-edit.component';

const routes: Routes = [{ path: '', component: LocationsComponent }];

@NgModule({
  declarations: [LocationsEditComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
})
export class LocationsModule {}
