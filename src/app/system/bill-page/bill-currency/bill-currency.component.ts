import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bill-currency',
  templateUrl: './bill-currency.component.html',
  styleUrls: ['./bill-currency.component.scss']
})
export class BillCurrencyComponent implements OnInit {
	
	@Input() currency: any; 

	currencyList: string[] = ['RUB', 'EUR', 'GBP']

  	constructor() { }

	ngOnInit() {
	}

}
