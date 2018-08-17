import './std-js/deprefixer.js';
import './std-js/shims.js';
import {ready, $} from './std-js/functions.js';
import * as Mutations from './std-js/mutations.js';
import './components/login-form.js';
import './components/logout-button.js';
import './components/upload-button.js';
import './components/register-button.js';
import './components/login-button.js';
import './components/registration-form.js';
import './components/upload-form.js';
import './components/copyright-year.js';

ready().then(async () => {
	const $doc = $(document.documentElement);
	$doc.replaceClass('no-js', 'js');
	Mutations.init();
	$doc.watch(Mutations.events, Mutations.options, Mutations.filter);
});
