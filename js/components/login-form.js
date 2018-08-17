import User from '../User.js';

class LoginForm extends HTMLFormElement {
	constructor() {
		super();
		this.addEventListener('submit', async event => {
			event.preventDefault();
			const user = await User.init();
			const dialog = this.closest('dialog[open]');
			await user.login();
			this.reset();
			if (dialog instanceof HTMLElement) {
				dialog.close();
			}
		});
	}
}

customElements.define('login-form', LoginForm, {extends: 'form'});