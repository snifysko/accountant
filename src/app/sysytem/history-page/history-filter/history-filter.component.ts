import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../shared/models/category-model';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent{
	@Input() isVivible;
	@Input() categories: Category[] = [];
	@Output() onFilterCancel = new EventEmitter<any>();
	@Output() onFilterApply = new EventEmitter<any>();

	selectPeriod = 'd';
	selectedTypes = new Set<string>();
	selectedCategories = new Set<string>();
	timePeriods = [
		{type: 'd', label: 'День'},
		{type: 'w', label: 'Неделя'},
		{type: 'M', label: 'Месяц'}
	];
	eventTypes = [
		{value: "income", label: "Доход"},
		{value: "outcome", label: "Расход"}
	];

	constructor() { 
	}

	CloseFilter(){
		this.selectPeriod = 'd';
		this.selectedTypes = new Set<string>();
		this.selectedCategories = new Set<string>();		
		this.onFilterCancel.emit();
	}

	ApplyFilter(){
		this.onFilterApply.emit({
			types: Array.from(this.selectedTypes),
			categories: Array.from(this.selectedCategories),
			period: this.selectPeriod
		});
	}

	UpdateDataSet(setName: Set<string>, checked: boolean, value: string): void{
		if(checked){
			setName.add(value);
		}else{
			setName.delete(value);
		}
	}

	ChangeType(target){
		this.UpdateDataSet(this.selectedTypes, target.checked, target.value);
	}

	ChangeCategory(target){
		this.UpdateDataSet(this.selectedCategories, target.checked, target.value);
	}
}
