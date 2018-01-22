import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	readonly passMinLen: number = 6;
	loginForm: FormGroup;
	message: Message = new Message('', 'danger');

	constructor(
		private userServise: UsersService,
		private authServise: AuthService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	validField(field: string): boolean {
		return this.loginForm.get(field).invalid &&  this.loginForm.get(field).touched;
	}

	errorValidation(field: string, typeValidation: string): boolean {
		return this.loginForm.get(field).errors[typeValidation];
	}

	errorLengthValidation(field: string): boolean {
		return this.loginForm.get(field).errors.minlength;
	}

	ngOnInit() {
		this.route.queryParams
			.subscribe( (params: Params) => {
				if (params['nowCanLogin']) {
					this.ShowMessage('Теперь вы можете залогиниться', 'success');
				}
			});

		this.loginForm = new FormGroup({
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'password': new FormControl(null, [Validators.required, Validators.minLength(this.passMinLen)])
		});
	}

	private ShowMessage(text: string, type: string = 'danger' ) {
		this.message = new Message(text, type);
		window.setTimeout( () => {
			this.message.text = '';
		}, 5000);
	}

	onSubmit() {
		const formData = this.loginForm.value;


		this.userServise.GetUserByEmail(formData.email)
			.subscribe( (user: User) => {
				if (user) {
					if (user.password === formData.password) {
						this.message.text = '';
						this.authServise.login();
						window.localStorage.setItem('user', JSON.stringify(user));
						// this.router.navigate([]);
					} else {
						this.ShowMessage('Неверный пароль!')
					}
				} else {
					this.ShowMessage('Пользователь не найден!')
				}
			})
	}

}
