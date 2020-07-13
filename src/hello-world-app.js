import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/demo/code-view.js';
import '@brightspace-ui/core/components/dialog/dialog-confirm.js';
import '@brightspace-ui/core/components/typography/typography.js';
import { LitElement, html, css } from 'lit-element';
import { d2lfetch } from 'd2l-fetch/src/index.js';
import { fetchAuthFramed } from 'd2l-fetch-auth';

d2lfetch.use({name: 'auth', fn: fetchAuthFramed});

async function whoami(client) {
	const valenceHost = await client.request('valenceHost');
	const response = await d2lfetch
		.fetch(`${valenceHost}/d2l/api/lp/1.0/users/whoami`);
	const val = await response.json();
	return val;
}

export class HelloWorldApp extends LitElement {

	static get properties() {
		return {
			data: { type: Object, attribute: false },
			whoami: { type: Object, attribute: false }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			.branding-primary {
				background-color: var(--d2l-branding-primary-color, red);
				color: white;
				height: 100px;
				padding: 10px;
				width: 200px;
			}
			.json {
				height: 500px;
			}
		`;
	}

	connectedCallback() {
		super.connectedCallback();
		new ifrauclient({ syncFont: true, syncTitle: true, syncCssVariable: true})
			.connect()
			.then((client) => {
				whoami(client).then((result) => {
						this.whoami = result;
					});
				Promise.all([
					client.request('orgUnit'),
					client.request('font'),
					client.request('intl'),
					client.request('timezone')
				]).then((ifrauData) => {
					this.data = {
						orgUnit: ifrauData[0],
						font: ifrauData[1],
						intl: ifrauData[2],
						timezone: ifrauData[3]
					};
				});
			});
	}

	render() {
		const code = this.data ? html`<d2l-code-view language="javascript" hide-language>${JSON.stringify(this.data, null, '    ')}</d2l-code-view>` : null;
		const whoami = this.whoami ? html`<d2l-code-view language="javascript" hide-language>${JSON.stringify(this.whoami, null, '    ')}</d2l-code-view>` : null;
		return html`
			<h1>Hello World</h1>
			<p>
				This is a simple free-range application demonstrating an
				IFRAME-based app.
			</p>
			<h2>Dialogs</h2>
			<d2l-dialog-confirm title-text="Confirm Dialog" text="Are you sure?">
				<d2l-button slot="footer" primary data-dialog-action="yes">Yes</d2l-button>
				<d2l-button slot="footer" data-dialog-action>No</d2l-button>
			</d2l-dialog-confirm>
			<d2l-button @click="${this._openDialog}">Open Dialog</d2l-button>
			<h2>Runtime data provided via ifrau:</h2>
			${code}
			<h2>Who Am I?</h2>
			<p>Results of a <strong>whoami</strong> Valence API call:</p>
			${whoami}
			<h2>Page Title Sync</h2>
			<p>
				The IFRAME's page title and the title of the outer page
				can be kept in sync by ifrau.
			</p>
			<label>
				page title
				<input type="text" onchange="document.title=value;" value="hello world" />
			</label>
			<h2>Branding Sync</h2>
			<p>Organization configurable branding-related CSS variables are synchronized.</p>
			<div class="branding-primary">
				Primary
			</div>
		`;
	}

	updated() {
		if ('parentIFrame' in window) {
			parentIFrame.size();
		}
	}

	_openDialog() {
		this.shadowRoot.querySelector('d2l-dialog-confirm').opened = true;
	}

}

customElements.define('hello-world-app', HelloWorldApp);