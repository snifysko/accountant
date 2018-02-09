import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Bill } from '../shared/models/bill';
import { BillService } from '../shared/services/bill.service';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
	initSubscription: Subscription;
	refreshSubscription: Subscription;
	bill: Bill;
	currency: any;
	isLoaded = false;

	constructor(
		private billService: BillService
	) { }

	ngOnInit() {
		this.initSubscription = Observable.combineLatest(
			this.billService.GetBill(),
			this.billService.GetCurrency()
		).subscribe( (data: [Bill, any] ) => {
			this.bill = data[0];
			this.currency = data[1];
			this.isLoaded = true;
		});
	}

	RefreshBillInfo(){
		this.isLoaded = false;
		this.refreshSubscription = this.billService.GetCurrency()
			.subscribe( (currency: any) => {
				this.currency = currency;
				this.isLoaded = true;
			});
	}

	ngOnDestroy() {
		this.initSubscription.unsubscribe();
		if(this.refreshSubscription) this.refreshSubscription.unsubscribe();
	}

}
