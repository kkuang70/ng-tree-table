import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreetableComponent } from './component/treetable.component';
import { MatTableModule } from '@angular/material/table'  


@NgModule({
  declarations: [
    TreetableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [
    TreetableComponent
  ]
})
export class TreetableModule { }
