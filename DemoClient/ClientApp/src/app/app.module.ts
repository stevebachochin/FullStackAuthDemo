import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewpgComponent } from './components/viewpg/viewpg.component';
import { FormpgComponent } from './components/formpg/formpg.component';
import { QuotesService } from './services/quotes.service';
import { HttpClientModule } from '@angular/common/http';
import { AppConfig } from './services/app.config.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from "./components/login/login.component";
import { AuthApiResponse } from './models/auth-api-response.model';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    ViewpgComponent,
    FormpgComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthApiResponse,
    AuthService,
    QuotesService,
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
