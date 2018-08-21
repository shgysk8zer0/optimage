let instance = null;

export default class User extends EventTarget {
	constructor() {
		super();
		this.userData = {};
		this.state = null;
		this.addEventListener('logout', () => {
			sessionStorage.removeItem('userData');
		});
		if (sessionStorage.hasOwnProperty('userData')) {
			this.login(JSON.parse(sessionStorage.getItem('userData')));
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

	async login(user) {
		try {
			if (! user.hasOwnProperty('email')) {
				throw new Error('Invalid user data');
			}
			this.state = true;
			this.userData = user;
			this.dispatchEvent(new CustomEvent('login'));
			this.dispatchEvent(new CustomEvent('stateChange'));
			if (! sessionStorage.hasOwnProperty('userData')) {
				sessionStorage.setItem('userData', JSON.stringify(user));
			}
		} catch (err) {
			console.error(err);
			this.logOut();
		}
	}

	async logOut() {
		this.state = false;
		this.dispatchEvent(new CustomEvent('logout'));
		this.dispatchEvent(new CustomEvent('stateChange'));
	}

	get signedIn() {
		return this.userData.hasOwnProperty('email');
	}

	static async init() {
		if (instance !== null) {
			return instance;
		} else {
			const user = new User();
			instance = user;
			return user.ready();
		}
	}
}
