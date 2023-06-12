import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSliderModule} from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './SettingsComponent';
import { AngularResizeEventModule } from 'angular-resize-event';
import {MatIconModule} from '@angular/material/icon';
import { tableComponent } from './tableComponent';
PlotlyModule.plotlyjs = PlotlyJS;
@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    tableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    PlotlyModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    AngularResizeEventModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
