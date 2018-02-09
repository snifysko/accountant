import { Component, OnInit, Input } from '@angular/core';
import { AppEvent } from '../../shared/models/app-event-model';
import { Category } from '../../shared/models/category-model';

@Component({
  selector: 'app-history-event',
  templateUrl: './history-event.component.html',
  styleUrls: ['./history-event.component.scss']
})
export class HistoryEventComponent implements OnInit {

	@Input() events: AppEvent[] = [];
	@Input() categories: Category[] = [];

	readonly mapFields = {
		amount: 'Сумма',
		date: 'Дата',
		category: 'Категория',
		type: 'Тип'
	}	
	currPalceholder: string = this.mapFields.amount;
	filterField: string = 'amount';
	filterStr: string = '';

	constructor() { }

	ngOnInit() {
		this.events.forEach( e => {
			e.catName = this.categories.find(c => c.id === e.category).name;
		} );
	}

	FilterItems(field: string): void{

		this.currPalceholder = this.mapFields[field];
		this.filterField = field;
	}

	GetClass(e: AppEvent){
		return {
			'label': true,
			'label-danger': e.type === 'outcome',
			'label-success': e.type === 'income'
		}
	}

	GetLabelText(e: AppEvent): string{
		return e.type === 'income' ? 'Доход' : 'Расход'
	}


}
