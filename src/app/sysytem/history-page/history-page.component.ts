import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { CategoryService } from '../shared/services/category.service';
import { EventService } from '../shared/services/event.service';
import { Category } from '../shared/models/category-model';
import { AppEvent } from '../shared/models/app-event-model';
import * as moment from 'moment';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
	subsCat: Subscription;
	categories: Category[] = [];
	events: AppEvent[] = [];
	filteredEvents: AppEvent[] = [];
	isLoaded: boolean = false;
	chartData: any[];
	isFilterVisible = false;

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
			this.CloneOriginalEvents();
			this.isLoaded = true;
			this.CalcChartData();
		} );
	}

	ngOnDestroy(){
		if(this.subsCat) this.subsCat.unsubscribe();
	}

	private ToggleFilterVisible(){
		this.isFilterVisible = !this.isFilterVisible;
	}	

	CalcChartData(): void{
		this.chartData = [];
		this.categories.forEach( (cat) => {
			const catEvents = this.filteredEvents.filter(e => e.category === cat.id && e.type === 'outcome');
			this.chartData.push({
				name: cat.name,
				value: catEvents.reduce( (total, event) => total + event.amount, 0)
			});
		});
	}

	private CloneOriginalEvents(){
		this.filteredEvents = this.events.slice();
	}

	OpenFilter(){
		this.ToggleFilterVisible();
	}

	OnFilterApply(filters){
		this.ToggleFilterVisible();
		this.CloneOriginalEvents();

		const startPeriod = moment().startOf(filters.period).startOf('d');
		const endPeriod = moment().endOf(filters.period).endOf('d');		

		if(filters.types.length !== 0 || filters.categories.length !== 0){
			this.filteredEvents = this.filteredEvents.filter( (e) => {
				return (filters.types.length === 0 || filters.types.indexOf(e.type) !== -1)
					&& (filters.categories.length === 0 || filters.categories.indexOf(e.category.toString()) !== -1)
					&& (filters.period === '' || moment(e.date, 'DD.MM.YYYY HH:mm:ss').isBetween(startPeriod, endPeriod))
			});
		}
		this.CalcChartData();
	}

	OnFilterCancel(){
		this.ToggleFilterVisible();
		this.CloneOriginalEvents();
		this.CalcChartData();
	}

	OnFilterClose(){
		this.ToggleFilterVisible();
	}
}
