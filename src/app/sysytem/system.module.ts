import { SystemRoutingModule } from './system-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system.component';
import { SharedModule } from '../shared/shared.module';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlannigPageComponent } from './plannig-page/plannig-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
	SystemComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlannigPageComponent,
    RecordsPageComponent
]
})
export class SystemModule { }
