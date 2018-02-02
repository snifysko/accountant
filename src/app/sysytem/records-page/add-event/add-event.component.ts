import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Category } from '../../shared/models/category-model';
import { AppEvent } from '../../shared/models/app-event-model';
import * as moment from 'moment';
import { EventService } from '../../shared/services/event.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill';
import { Message } from '../../../shared/models/message.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

	@Input() categoryList: Category[] = [];

	private types = [
		{name: "Приход", val: "income"},
		{name: "Расход", val: "outcome"}
	];
	private currCat = 0;
	private currAmount = 1;
	private currDescription = '';
	private subGet: Subscription;
	private subUpdate: Subscription;

	constructor(
		private eventService: EventService,
		private billservice: BillService
	) { }

	message: Message = new Message('', '');

	ngOnInit() {
	}

	ngOnDestroy(){
		if(this.subGet) this.subGet.unsubscribe();
		if(this.subUpdate) this.subUpdate.unsubscribe();
	}

	ShowError(msg: string){
		this.message = new Message(msg, 'danger');
		window.setTimeout( () => this.message.text = '', 5000);
	}

	ShowSuccess(msg: string){
		this.message = new Message(msg, 'success');
		window.setTimeout( () => this.message.text = '', 5000);
	}

	OnSubmit(frm: NgForm){
		let {category, type, amount, description} = frm.value;
		const newEvent = new AppEvent(
			type, 
			+amount, 
			+category, 
			moment().format('DD.MM.YYYY HH:mm:ss'), 
			description
		);

		this.subGet = this.billservice.GetBill()
			.subscribe( (bill: Bill) => {
				let total = 0;

				if(type === 'outcome'){
					if(+amount > bill.value){
						this.ShowError(`На счету недостаточно средств. 
							Есть: ${bill.value + bill.currency}, 
							расход ${amount +  bill.currency}.`
						);
						return;
					}else{
						total = bill.value - amount;
					}
				}else if(type === 'income'){
					total = bill.value + amount; 
				}

				this.subUpdate = this.billservice.UpdateBill(new Bill(total, bill.currency))
					.mergeMap( () => this.eventService.AddEvent(newEvent) )
					.subscribe( () => {
						frm.setValue({
							category: 0, 
							type: 'outcome', 
							amount: 1, 
							description: ''
						});
						this.ShowSuccess('Событие добавлено.');
					});
			});
	}

}