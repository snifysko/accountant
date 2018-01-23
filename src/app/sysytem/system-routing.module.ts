import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router/src/config';

import { SystemComponent } from './system.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlannigPageComponent } from './plannig-page/plannig-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';

const routes: Routes = [
	{path: 'system', component: SystemComponent, children: [
		{path: 'bill', component: BillPageComponent},
		{path: 'history', component: HistoryPageComponent},
		{path: 'planning', component: PlannigPageComponent},
		{path: 'records', component: RecordsPageComponent}
	]}
];


@NgModule({
  	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
  	declarations: []
})

export class SystemRoutingModule { }