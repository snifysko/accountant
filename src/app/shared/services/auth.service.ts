export class AuthService {

	private isAutintificate = false;

	login(){
		this.isAutintificate = true;
	}

	logout() {
		this.isAutintificate = false;
		window.localStorage.clear();
	}

	isloggedIn(): boolean {
		return this.isAutintificate;
	}

}
