import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { AlertService } from '../../services/index';

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent
  ]
})

export class AlertModule {}
