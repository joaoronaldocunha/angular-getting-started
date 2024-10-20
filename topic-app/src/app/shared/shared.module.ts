import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe-pipe';

@NgModule({
  declarations: [
    SafePipe // Declare o SafePipe aqui
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SafePipe // Exporte o SafePipe para que outros módulos possam usá-lo
  ]
})
export class SharedModule { }