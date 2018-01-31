import { Subscription } from 'rxjs/Subscription';
import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category-model';
import { Message } from '../../../shared/models/message.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy{

	@Output() onCategoryAdd = new EventEmitter<Category>();
	message: Message = new Message('', '');
	catSubs: Subscription;

	constructor(
		private categoryService: CategoryService
	) { }

	ngOnDestroy(){
		if(this.catSubs) this.catSubs.unsubscribe();
	}

	ShowSuccess(msg: string){
		this.message = new Message(msg, 'success');
		window.setTimeout( () => this.message.text = '', 5000);
	}	

	OnSubmit(form: NgForm){
		let {name, capacity} = form.value;
		if(capacity < 0) capacity *= -1;

		const category = new Category(name, capacity);

		this.catSubs = this.categoryService.AddCategory(category)
			.subscribe( (category: Category) => {
				form.reset();
				form.form.patchValue({capacity: 1});
				this.onCategoryAdd.emit(category);
				this.ShowSuccess('Запись добавлена');
			});

	}

}
