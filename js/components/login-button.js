import User from '../User.js';
import {$} from '../std-js/functions.js';

class LoginButton extends HTMLButtonElement {
	constructor() {
		super();
		this.init();
	}

	async init() {
		this.addEventListener('click', () => {
			$('dialog[open]').close();
			$('#login-dialog').showModal();
		});

		User.init().then(async user => {
			if (user.signedIn) {
				this.hidden = true;
				this.disabled = true;
			} else {
				this.hidden = false;
				this.disabled = false;
			}

			user.addEventListener('logout', () => {
				this.hidden = false;
				this.disabled = false;
			});

			user.addEventListener('login', () => {
				this.hidden = true;
				this.disabled = true;
			});
		});
	}
}

customElements.define('login-button', LoginButton, {extends: 'button'});
