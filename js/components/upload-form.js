class UploadForm extends HTMLFormElement {
	constructor() {
		super();
		this.addEventListener('submit', async event => {
			event.preventDefault();
			try {
				const headers = new Headers();
				headers.set('Accept', 'application/json');
				const resp =await fetch(this.action, {
					headers,
					method: this.method,
					body: new FormData(this),
					mode: 'cors',
				});
				if (resp.ok) {
					const data = await resp.json();
					console.info(data);
					const dialog = this.closest('dialog[open]');
					this.reset();
					if (dialog instanceof HTMLElement) {
						dialog.close();
					}
				} else {
					if (resp.headers.get('Content-Type').startsWith('application/json')) {
						const error = await resp.json();
						throw new Error(`${error.message} [${error.code}]`);
					} else {
						throw new Error(`${resp.url} [${resp.status} ${resp.statusText}]`);
					}
				}
			} catch (err) {
				console.error(err);
			}
		});
	}
}

customElements.define('upload-form', UploadForm, {extends: 'form'});
