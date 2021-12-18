import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorHandlingComponent } from './components/error-handling/error-handling.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    LoaderComponent,
    ErrorHandlingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    LoaderComponent,
    ErrorHandlingComponent
  ]
})
export class SharedModule { }
