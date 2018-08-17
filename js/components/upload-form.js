class UploadForm extends HTMLFormElement {
	constructor() {
		super();
		this.addEventListener('submit', async event => {
			event.preventDefault();
			this.reset();
			const dialog = this.closest('dialog[open]');
			if (dialog instanceof HTMLElement) {
				dialog.close();
			}
		});
	}
}

customElements.define('upload-form', UploadForm, {extends: 'form'});
