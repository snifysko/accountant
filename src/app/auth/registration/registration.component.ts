import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {PromiseObservable} from 'rxjs/observable/PromiseObservable';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

	registrationForm: FormGroup;
	passMinLen = 8;
	nameMinLen = 3;

	constructor(
		private userService: UsersService,
		private router: Router
	) { }

	ngOnInit() {
		this.registrationForm = new FormGroup({
			'email': new FormControl(null, [Validators.required, Validators.email], this.ForbiddenEmail.bind(this)),
			'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
			'name': new FormControl(null, [Validators.required, Validators.minLength(3)]),
			'agree': new FormControl(false, [Validators.requiredTrue])
		})
	}

	validField(field: string): boolean {
		return this.registrationForm.get(field).invalid &&  this.registrationForm.get(field).touched;
	}

	errorValidation(field: string, typeValidation: string): boolean {
		return this.registrationForm.get(field).errors[typeValidation];
	}

	errorLengthValidation(field: string): boolean {
		return this.registrationForm.get(field).errors.minlength;
	}

	onSubmit() {
		const {name, password, email} = this.registrationForm.value;
		const user = new User(email, password, name);

		this.userService.CreateUser(user)
			.subscribe( (newUser: User) => {
				console.log(newUser);

				this.router.navigate(['/login'], {
					queryParams: {
						'nowCanLogin': true
					}
				});
			});
	}

	ForbiddenEmail(control: FormControl): Promise<any> {
		return new Promise( (resolve, reject) => {
			return this.userService.GetUserByEmail(control.value)
				.subscribe( (user: User) => {
					if (user) {
						return resolve({forbiddenEmail: true});
					} else {
						resolve(null);
					}
				});
		});
	}

}

/*
return new Promise( (resolve, reject) => {
			return this.userService.GetUserByEmail(control.value)
				.subscribe( (user: User) => {
					if (user) {
						resolve({forbiddenUser: true});
					} else {
						resolve(null) ;
					}
				});
		}
		*/
