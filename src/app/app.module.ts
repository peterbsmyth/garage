import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GaragePage } from './pages/garage/garage.page';
import { CubeComponent } from './components/cube/cube.component';

@NgModule({
  declarations: [
    AppComponent,
    GaragePage,
    CubeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
