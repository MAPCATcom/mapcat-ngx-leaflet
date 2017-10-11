import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './map.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

const appRoutes: Routes = [
  {
    path: ':z/:x/:y',
    component: MapComponent
  },
  {
    path: '**',
    component: MapComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LeafletModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
