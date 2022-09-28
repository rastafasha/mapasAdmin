import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './http-interceptors/index';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//modulos
import{PagesModule} from './pages/pages.modulo';
import {SharedModule} from './shared/shared.modulo';
import {ComponentsModule} from './components/componets.modulo';


import { CKEditorModule } from 'ckeditor4-angular';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    ComponentsModule,
    HttpClientModule,
    AuthModule,
    CKEditorModule,
    RouterModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
