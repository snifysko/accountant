import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router/src/config';

import { SystemComponent } from './system.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './plannig-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { HistoryDetailComponent } from './history-page/history-detail/history-detail.component';

const routes: Routes = [
	{path: 'system', component: SystemComponent, children: [
		{path: 'bill', component: BillPageComponent},
		{path: 'history', component: HistoryPageComponent},
		{path: 'history/:id', component: HistoryDetailComponent},
		{path: 'planning', component: PlanningPageComponent},
		{path: 'records', component: RecordsPageComponent}
	]}
];

@NgModule({
  	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class SystemRoutingModule { }