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
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { BillCurrencyComponent } from './bill-page/bill-currency/bill-currency.component';
import { BillService } from './shared/services/bill.service';
import { MomentPipe } from './shared/pipes/moment.pipe';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { CategoryService } from './shared/services/category.service';
import { EventService } from './shared/services/event.service';
import { HistoryChartComponent } from './history-page/history-chart/history-chart.component';
import { HistoryDetailComponent } from './history-page/history-detail/history-detail.component';
import { HistoryEventComponent } from './history-page/history-event/history-event.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import { FilterEventsPipe } from './shared/pipes/filter-events.pipe';

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
		DropdownDirective,
		BillCardComponent,
		BillCurrencyComponent,
		MomentPipe,
		FilterEventsPipe,
		AddCategoryComponent,
		EditCategoryComponent,
		AddEventComponent,
		HistoryChartComponent,
		HistoryDetailComponent,
		HistoryEventComponent,
		HistoryFilterComponent
	],
	providers: [
		BillService,
		CategoryService,
		EventService
	]
})
export class SystemModule { }
