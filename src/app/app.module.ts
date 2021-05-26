import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiModule } from './api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GotWorldModule } from './components/got-world/got-world.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ApiModule,
    BrowserModule,
    AppRoutingModule,
    GotWorldModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
