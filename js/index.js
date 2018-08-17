import './std-js/deprefixer.js';
import './std-js/shims.js';
import {ready, $} from './std-js/functions.js';
import * as Mutations from './std-js/mutations.js';
import {confirm} from './std-js/asyncDialog.js';

function loggedIn(state = false, save = true) {
	if (state) {
		document.documentElement.dataset.loggedIn = 'yes';
		document.documentElement.classList.add('signed-in');
		$('.signed-in').attr({hidden: false, disabled: false});
		$('.signed-out').attr({hidden: true, disabled: true});
	} else {
		document.documentElement.dataset.loggedIn = 'no';
		document.documentElement.classList.remove('signed-in');
		$('.signed-in').attr({hidden: true, disabled: true});
		$('.signed-out').attr({hidden: false, disabled: false});
	}
	if (save) {
		sessionStorage.setItem('loggedIn', state ? 'yes' : 'no');
	}
}

ready().then(async () => {
	const $doc = $(document.documentElement);
	$doc.replaceClass('no-js', 'js');
	Mutations.init();
	$doc.watch(Mutations.events, Mutations.options, Mutations.filter);

	if (sessionStorage.hasOwnProperty('loggedIn')) {
		loggedIn(sessionStorage.getItem('loggedIn') === 'yes', false);
	}

	$('form').submit(async event => {
		event.preventDefault();
		if (['register', 'login'].includes(event.target.name)) {
			loggedIn(true);
			$('dialog[open]').close();
			event.target.reset();
		}
	});

	$('[data-action="sign-out"]').click(async event => {
		event.preventDefault();
		if (await confirm('Are you sure you want to sign-out?')) {
			loggedIn(false);
		}
	});
});
