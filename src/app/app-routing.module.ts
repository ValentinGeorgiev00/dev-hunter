import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    loadChildren: () =>
      import('./auth/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'technologies',
    loadChildren: () =>
      import('./technologies/technologies.module').then(
        (m) => m.TechnologiesModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'locations',
    loadChildren: () =>
      import('./locations/locations.module').then(
        (m) => m.LocationsModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'developers',
    loadChildren: () =>
      import('./developers/developers.module').then(
        (m) => m.DevelopersModule
      ),
    canLoad: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
