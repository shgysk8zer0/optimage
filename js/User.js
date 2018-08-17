let instance = null;

export default class User extends EventTarget {
	constructor(signedIn = false) {
		super();
		this.state = null;

		this.addEventListener('login', () => {
			sessionStorage.setItem('signedIn', 'yes');
		});
		this.addEventListener('logout', () => {
			sessionStorage.setItem('signedIn', 'no');
		});
		if (signedIn) {
			this.login();
		} else {
			this.logOut();
		}
	}

	async ready() {
		if (this.state !== null) {
			return this;
		} else {
			return new Promise(resolve => {
				this.addEventListener('stateChange', () => resolve(this));
			});
		}
	}

	async login() {
		this.state = true;
		this.dispatchEvent(new CustomEvent('login'));
		this.dispatchEvent(new CustomEvent('stateChange'));
	}

	async logOut() {
		this.state = false;
		this.dispatchEvent(new CustomEvent('logout'));
		this.dispatchEvent(new CustomEvent('stateChange'));
	}

	get signedIn() {
		return sessionStorage.hasOwnProperty('signedIn') && sessionStorage.getItem('signedIn') === 'yes';
	}

	static async init() {
		if (instance !== null) {
			return instance;
		} else {
			const state = sessionStorage.hasOwnProperty('signedIn') && sessionStorage.getItem('signedIn') === 'yes';
			const user = new User(state);
			instance = user;
			return user.ready();
		}
	}
}
