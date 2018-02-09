import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{path: '', redirectTo: 'login', pathMatch: 'full'},
	{path: 'system', loadChildren: './system/system.module#SystemModule'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
	exports: [RouterModule]
})

export class AppRoutingModule { }
