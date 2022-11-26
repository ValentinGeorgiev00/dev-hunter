import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { AuthenticationModule } from './auth/authentication.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LocationsComponent } from './locations/locations.component';
import { DevelopersComponent } from './developers/developers.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TechnologiesComponent,
    PageNotFoundComponent,
    HomeComponent,
    ConfirmDialogComponent,
    LocationsComponent,
    DevelopersComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
