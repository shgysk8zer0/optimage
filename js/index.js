import './std-js/deprefixer.js';
import './std-js/shims.js';
import {ready, $} from './std-js/functions.js';
import * as Mutations from './std-js/mutations.js';
import {confirm} from './std-js/asyncDialog.js';
import User from './User.js';

ready().then(async () => {
	const $doc = $(document.documentElement);
	$doc.replaceClass('no-js', 'js');
	Mutations.init();
	$doc.watch(Mutations.events, Mutations.options, Mutations.filter);
	const user = await User.init();

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
