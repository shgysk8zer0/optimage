import {$} from './std-js/functions.js';

export default class User extends EventTarget {
	constructor(signedIn = false) {
		super();
		this.state = null;
		if (signedIn) {
			this.login().then(() => {
				this.dispatchEvent(new CustomEvent('stateChange'));
				this.dispatchEvent(new CustomEvent('login'));
			});
		} else {
			this.logOut().then(() => {
				this.dispatchEvent(new CustomEvent('stateChange'));
				this.dispatchEvent(new CustomEvent('login'));
			});
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
		sessionStorage.setItem('signedIn', 'yes');
		document.documentElement.dataset.loggedIn = 'yes';
		document.documentElement.classList.add('signed-in');
		$('.signed-in').attr({hidden: false, disabled: false});
		$('.signed-out').attr({hidden: true, disabled: true});
	}

	async logOut() {
		sessionStorage.setItem('signedIn', 'no');
		document.documentElement.dataset.loggedIn = 'no';
		document.documentElement.classList.remove('signed-in');
		$('.signed-in').attr({hidden: true, disabled: true});
		$('.signed-out').attr({hidden: false, disabled: false});
	}

	get signedIn() {
		return sessionStorage.hasOwnProperty('signedIn') && sessionStorage.getItem('signedIn') === 'yes';
	}

	static async init() {
		const state = sessionStorage.hasOwnProperty('signedIn') && sessionStorage.getItem('signedIn') === 'yes';
		const user = new User(state);
		return user.ready();
	}
}
