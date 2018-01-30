import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category-model';
import { CategoryService } from '../shared/services/category.service';

@Component({
	selector: 'app-records-page',
	templateUrl: './records-page.component.html',
	styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {
	isLoaded = false;
	categoryList: Category[] = [];

	constructor(
		private categoryService: CategoryService
	) { }

	ngOnInit() {
		this.categoryService.GetCategories()
			.subscribe( (catList: Category[]) => {
				this.categoryList = catList;
				this.isLoaded = true;
			});
	}

	NewCategoryAdded(category: Category){
		this.categoryList.push(category);
	}

	CategoryUpdated(category: Category){
		const indx = this.categoryList.findIndex( (item)  => item.id === category.id );
		this.categoryList[indx] = category;
	}
}
