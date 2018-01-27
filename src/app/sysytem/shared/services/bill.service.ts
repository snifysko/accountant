import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Bill } from '../models/bill';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi{

	constructor(public http: Http) { 
		super(http);
	}

	GetBill(): Observable<Bill>{
		return this.get('/bill');
	}

	GetCurrency(base: string = 'USD'): Observable<any>{
		return this.http.get(`https://api.fixer.io/latest?base=${base}`)
		.map( (response: Response) => response.json() );
	}

}