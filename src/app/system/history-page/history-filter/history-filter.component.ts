import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../shared/models/category-model';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit{
	@Input() isVivible: boolean = false;
	@Input() categories: Category[] = [];
	@Output() onFilterCancel = new EventEmitter<any>();
	@Output() onFilterApply = new EventEmitter<any>();
	@Output() onFilterClose = new EventEmitter<any>();

	selectPeriod = '';
	selectedTypes: string[] = [];
	selectedCategories: string[] = [];
	timePeriods = [
		{type: '', label: 'Все'},
		{type: 'd', label: 'День'},
		{type: 'w', label: 'Неделя'},
		{type: 'M', label: 'Месяц'}
	];
	eventTypes = [
		{value: "income", label: "Доход", selected: false},
		{value: "outcome", label: "Расход", selected: false}
	];

	constructor() { 
	}

	ngOnInit(){
		this.categories.map(i => i.selected = false);
	}

	CloseFilter(){
		this.onFilterClose.emit();
	}

	CanselFilter(){
		this.selectPeriod = '';
		this.selectedTypes = [];
		this.selectedCategories = [];		
		this.eventTypes.map(i => i.selected = false);
		this.categories.map(i => i.selected = false);
		this.onFilterCancel.emit();
	}

	ApplyFilter(){
		this.onFilterApply.emit({
			types: this.selectedTypes,
			categories:this.selectedCategories,
			period: this.selectPeriod
		});
	}

	UpdateDataSet(field: string, checked: boolean, value: string): void{
		if(checked){
			this[field].push(value);
		}else{
			this[field] = this[field].filter( (i) => i !== value);
		}
	}

	ChangeType(target){
		this.UpdateDataSet('selectedTypes', target.checked, target.value);
	}

	ChangeCategory(target){
		this.UpdateDataSet('selectedCategories', target.checked, target.value);
	}
}
