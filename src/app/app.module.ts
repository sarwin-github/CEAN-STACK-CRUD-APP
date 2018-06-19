import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, RequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeRoutingModule } from './home/home.routing.module';
import { CustomRequestOptions } from './api/request-options/set-request-headers';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HomeRoutingModule
  ],
  providers: [{ provide: RequestOptions, useClass: CustomRequestOptions }],
  bootstrap: [AppComponent]
})
export class AppModule { }
