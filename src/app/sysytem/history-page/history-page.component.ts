import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { CategoryService } from '../shared/services/category.service';
import { EventService } from '../shared/services/event.service';
import { Category } from '../shared/models/category-model';
import { AppEvent } from '../shared/models/app-event-model';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
	subsCat: Subscription;
	categories: Category[] = [];
	events: AppEvent[] = [];
	isLoaded: boolean = false;
	chartData: any[];

	constructor(
		private categoryServise: CategoryService,
		private eventService: EventService
	) { }

	ngOnInit() {
		this.subsCat = Observable.combineLatest(
			this.categoryServise.GetCategories(),
			this.eventService.GetEvents()
		).subscribe( (data: [ Category[], AppEvent[] ]) => {
			this.categories = data[0];
			this.events = data[1];
			this.isLoaded = true;
			this.CalcChartData();
		} );
	}

	CalcChartData(): void{
		this.chartData = [];
		this.categories.forEach( (cat) => {
			const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
			this.chartData.push({
				name: cat.name,
				value: catEvents.reduce( (total, event) => total + event.amount, 0)
			});
		});
	}

	ngOnDestroy(){
		if(this.subsCat) this.subsCat.unsubscribe();
	}

}
