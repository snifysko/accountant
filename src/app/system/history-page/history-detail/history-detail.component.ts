import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { EventService } from '../../shared/services/event.service';
import { CategoryService } from '../../shared/services/category.service';
import { AppEvent } from '../../shared/models/app-event-model';
import { Category } from '../../shared/models/category-model';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
	isLoaded = false;
	event: AppEvent;
	category: Category;
	eventsSubscript: Subscription;

	constructor(
		private route: ActivatedRoute,
		private eventService: EventService,
		private categoryService: CategoryService
	) { }

	ngOnInit() {
		this.eventsSubscript =  this.route.params
			.mergeMap( (params: Params) => this.eventService.GetEventById(params.id))
			.mergeMap( (event: AppEvent) => {
				this.event = event;
				return this.categoryService.GetCategoryById(event.category)
			})
			.subscribe( (category: Category) => {
				this.category = category;
				this.isLoaded = true;
			});
	}

	ngOnDestroy(){
		if(this.eventsSubscript) this.eventsSubscript.unsubscribe();
	}

	CardStyle(){
		return {
			'card-success':  this.event.type === 'income',
			'card-danger': this.event.type === 'outcome'
		}
	}
	 
	GetTypeStr(){
		return this.event.type === 'income' ? 'Доход' : 'Расход'; 
	}
}
