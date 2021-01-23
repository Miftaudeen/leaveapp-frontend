import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { LeavesComponent } from './leaves/leaves.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {MatInputModule} from '@angular/material/input';
import {AppRoutingModule} from './app-routing.module';
import {DatePipe} from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';

@NgModule({
  declarations: [
    AppComponent,
    LeavesComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    AppRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatAutocompleteModule,
    MatSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: DatePipe}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
