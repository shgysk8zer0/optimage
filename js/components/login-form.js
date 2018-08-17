import User from '../User.js';

class LoginFrom extends HTMLFormElement {
	constructor() {
		super();
		this.addEventListener('submit', async event => {
			event.preventDefault();
			const user = await User.init();
			user.login();
		});
	}
}

customElements.define('login-form', LoginFrom, {extends: 'form'});
