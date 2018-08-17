const now = new Date();
class CopyrightYear extends HTMLTimeElement {
	constructor() {
		super();
		this.textContent = now.getFullYear();
		this.dateTime = now.toISOString();
	}
}

customElements.define('copyright-year', CopyrightYear, {extends: 'time'});
