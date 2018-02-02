import { NgxChartsModule } from '@swimlane/ngx-charts';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
	imports: [FormsModule, ReactiveFormsModule, NgxChartsModule],
	exports: [FormsModule, ReactiveFormsModule, NgxChartsModule]
})

export class SharedModule {}
