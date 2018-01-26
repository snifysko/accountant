import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {User} from '../models/user.model';
import { BaseApi } from '../core/base-api';


@Injectable()
export class  UsersService extends BaseApi {
	constructor(public http: Http) {
		super(http);
	}

	GetUserByEmail(email: string): Observable<User> {
		return this.get(`/users?email=${email}`)
			.map( (user: User[]) => user[0] ? user[0] : undefined);
	}

	CreateUser(user: User): Observable<User>{
		return this.post('/users', user);
	}
}

