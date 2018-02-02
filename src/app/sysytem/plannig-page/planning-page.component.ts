import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { BillService } from '../shared/services/bill.service';
import { CategoryService } from '../shared/services/category.service';
import { EventService } from '../shared/services/event.service';
import { Bill } from '../shared/models/bill';
import { Category } from '../shared/models/category-model';
import { AppEvent } from '../shared/models/app-event-model';
import { CategoryInfo } from '../shared/models/category-info';

@Component({
  selector: 'app-plannig-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {
	private isLoaded = false;
	private bill: Bill;
	private categories: Category[] = [];
	private catFullInfo: CategoryInfo[] = [];
	private events: AppEvent[] = [];
	private inputStream: Subscription;

	constructor(
		private billService: BillService,
		private categoryService: CategoryService,
		private eventService: EventService
	) { }

	ngOnInit() { 
		this.inputStream = Observable.combineLatest(
			this.billService.GetBill(),
			this.categoryService.GetCategories(),
			this.eventService.GetEvents()
		).subscribe( (data: [Bill, Category[], AppEvent[] ]) => {
			this.bill = data[0];
			this.categories = data[1];
			this.events = data[2];
			this.catFullInfo = this.CalcCategoryInfo();
			this.isLoaded = true;
		});
	 }

	ngOnDestroy() {
		if(this.inputStream) this.inputStream .unsubscribe();
	}

	CalcCategoryInfo(): CategoryInfo[] {
		let res: CategoryInfo[] = [];
		let cost: AppEvent[] = [];
		for(let cnt = 0; cnt < this.categories.length; cnt++) {
			let cost =  this.events.filter( (e) => e.category === this.categories[cnt].id && e.type === 'outcome')
						.reduce( (total, current) => {return total + current.amount}, 0);
			let percent = cost * 100 / this.categories[cnt].capacity;


			if(percent > 100) percent = 100;
			let colorClass = percent < 60 ? 'success' :  percent < 100 ? 'warning' : 'danger';

			res.push(new CategoryInfo(
				this.categories[cnt].id,
				this.categories[cnt].name,
				this.categories[cnt].capacity,
				cost,
				percent,
				percent + '%',
				colorClass
			));
		}
		return res;

	}

	
}
