import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { DevelopersComponent } from './developers.component';
import { DevelopersEditComponent } from './developers-edit/developers-edit.component';

const routes: Routes = [{ path: '', component: DevelopersComponent }];

@NgModule({
  declarations: [DevelopersEditComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
})
export class DevelopersModule {}
