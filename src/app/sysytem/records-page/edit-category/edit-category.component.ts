import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category-model';
import { Message } from '../../../shared/models/message.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
	isLoaded = false;
	msg: Message = new Message("", "success");

	@Input() categoryList: Category[] = [];
	@Output() onCategoryUpdated = new EventEmitter<Category>();

	private currId = 0;
	private curCategory: Category = new Category("", 0, 0);

	constructor(
		private categoryService: CategoryService
	) { }

	ngOnInit() {
	}

	OnSubmit(inputForm: NgForm){
		let {name, capacity} = inputForm.value;
		if(capacity < 0 ) capacity *= -1;
		const cat = new Category(name, capacity, +this.currId);
		
		this.categoryService.UpdateCategory(cat)
			.subscribe( (category: Category) => {
				this.onCategoryUpdated.emit(category);
				this.msg = new Message("Изменения сохранены", "success");
				window.setTimeout( () => {
					this.msg.text = "";
				}, 5000);
			});
	}

	ChangeSelect(){
		this.curCategory = this.categoryList.find( c => c.id === +this.currId );
	}



}
