import User from '../User.js';

class RegistrationForm extends HTMLFormElement {
	constructor() {
		super();
		this.addEventListener('submit', async event => {
			event.preventDefault();
			const user = await User.init();
			const dialog = this.closest('dialog[open]');
			user.login();
			this.reset();
			if (dialog instanceof HTMLElement) {
				dialog.close();
			}
		});
	}
}

customElements.define('registration-form', RegistrationForm, {extends: 'form'});
