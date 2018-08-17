import User from '../User.js';
import {confirm} from '../std-js/asyncDialog.js';

class LogoutButton extends HTMLButtonElement {
	constructor() {
		super();
		this.init();
	}

	async init() {
		await customElements.whenDefined('logout-button');

		User.init().then(async user => {
			if (user.signedIn) {
				this.hidden = false;
				this.disabled = false;
			} else {
				this.hidden = true;
				this.disabled = true;
			}

			user.addEventListener('logout', () => {
				this.hidden = true;
				this.disabled = true;
			});

			user.addEventListener('login', () => {
				this.hidden = false;
				this.disabled = false;
			});

			this.addEventListener('click', async () => {
				if (await confirm('Are your sure you want to sign out?')) {
					user.logOut();
				}
			});
		});
	}
}

customElements.define('logout-button', LogoutButton, {extends: 'button'});
