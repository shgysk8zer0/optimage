import User from '../User.js';
import {$} from '../std-js/functions.js';

class UploadButton extends HTMLButtonElement {
	constructor() {
		super();
		this.init();
	}

	async init() {
		this.addEventListener('click', () => {
			$('dialog[open]').close();
			$('#upload-dialog').showModal();
		});

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
		});
	}
}

customElements.define('upload-button', UploadButton, {extends: 'button'});
