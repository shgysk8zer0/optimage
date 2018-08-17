import './std-js/deprefixer.js';
import './std-js/shims.js';
import {ready, $} from './std-js/functions.js';
import * as Mutations from './std-js/mutations.js';
import {confirm} from './std-js/asyncDialog.js';
import User from './User.js';
import './components/login-form.js';
import './components/logout-button.js';
window.User = User;

ready().then(async () => {
	const $doc = $(document.documentElement);
	$doc.replaceClass('no-js', 'js');
	Mutations.init();
	$doc.watch(Mutations.events, Mutations.options, Mutations.filter);
	const user = await User.init();
	if (user.signedIn) {
		$('.signed-in').attr({hidden: false, disabled: false});
		$('.signed-out').attr({hidden: true, disabled: true});
	} else {
		$('.signed-in').attr({hidden: true, disabled: true});
		$('.signed-out').attr({hidden: false, disabled: false});
	}

	user.addEventListener('login', () => {
		$('.signed-in').attr({hidden: false, disabled: false});
		$('.signed-out').attr({hidden: true, disabled: true});
	});
	user.addEventListener('logout', () => {
		$('.signed-in').attr({hidden: true, disabled: true});
		$('.signed-out').attr({hidden: false, disabled: false});
	});

	$('form').submit(async event => {
		event.preventDefault();
		if (['register', 'login'].includes(event.target.name)) {
			user.login();
			$('dialog[open]').close();
			event.target.reset();
		}
	});

	$('[data-action="sign-out"]').click(async event => {
		event.preventDefault();
		if (await confirm('Are you sure you want to sign-out?')) {
			user.logOut();
		}
	});
});
