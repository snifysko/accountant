import { SystemRoutingModule } from './system-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemComponent } from './system.component';
import { SharedModule } from '../shared/shared.module';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { PlanningPageComponent } from './plannig-page/planning-page.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		SystemRoutingModule
	],
  	declarations: [
		BillPageComponent,
		HistoryPageComponent,
		PlanningPageComponent,
		RecordsPageComponent,
		SystemComponent,
		SidebarComponent,
		HeaderComponent,
		DropdownDirective
	]
})
export class SystemModule { }
