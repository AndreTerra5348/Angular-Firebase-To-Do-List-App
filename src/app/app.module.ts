import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './core/template/header/header.component';
import { FooterComponent } from './core/template/footer/footer.component';
import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule, 
    CoreModule,
    AuthModule,
    TodoListModule,
    SharedModule,
    HomeModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
