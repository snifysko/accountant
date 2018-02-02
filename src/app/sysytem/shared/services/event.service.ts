import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { BaseApi } from '../../../shared/core/base-api';
import { AppEvent } from '../models/app-event-model';

@Injectable()
export class EventService extends BaseApi{

	constructor(public http: Http) { 
		super(http);
	}

	AddEvent(event: AppEvent): Observable<AppEvent>{
		return this.post('/events', event);
	}

	GetEvents(): Observable<AppEvent[]>{
		return this.get('/events');
	}
}