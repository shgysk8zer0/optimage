import './std-js/deprefixer.js';
import './std-js/shims.js';
import {ready, $} from './std-js/functions.js';
import * as Mutations from './std-js/mutations.js';

ready().then(async () => {
	const $doc = $(document.documentElement);
	$doc.replaceClass('no-js', 'js');
	Mutations.init();
	$doc.watch(Mutations.events, Mutations.options, Mutations.filter);

	$('form').submit(async event => {
		event.preventDefault();
	});
});
