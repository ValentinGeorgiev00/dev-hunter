import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TechnologiesComponent } from './technologies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TechnologiesEditComponent } from './technologies-edit/technologies-edit.component';
import { MaterialModule } from '../material/material.module';

const routes: Routes = [{ path: '', component: TechnologiesComponent }];

@NgModule({
  declarations: [TechnologiesEditComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
})
export class TechnologiesModule {}
