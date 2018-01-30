import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { BaseApi } from '../../../shared/core/base-api';
import { Category } from '../models/category-model';

@Injectable()
export class CategoryService extends BaseApi{

	constructor(public http: Http) { 
		super(http);
	}

	AddCategory(category: Category): Observable<Category>{
		return this.post('/categories', category);
	}

	GetCategories(){
		return this.get('/categories');
	}

	UpdateCategory(category: Category){
		return this.put(`/categories/${category.id}`, category);
	}

}