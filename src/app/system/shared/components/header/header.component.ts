import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
	currDate = new Date();
	currUser: User;

	constructor(
		private authService: AuthService,
		private router: Router
	) { }

	ngOnInit(){
		this.currUser = JSON.parse(window.localStorage.getItem('user'));
	}

	onLogout(){
		this.authService.logout();
		this.router.navigate(['/login']);
	}

}
