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
	subscription: Subscription

	constructor(
		private billService: BillService
	) { }

	ngOnInit() {
		this.subscription = Observable.combineLatest(
			this.billService.GetBill(),
			this.billService.GetCurrency()
		).subscribe( (data: [Bill, any] ) => {
			console.log(data);
		});
	}

  ngOnDestroy() {
	this.subscription.unsubscribe();
	  
  }

}
