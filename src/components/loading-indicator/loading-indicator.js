import { html } from 'lit-element';
import './loading-indicator.scss';
import BaseComponent from '../../global/BaseComponent';

const LOADING_TEXT = 'Loading Content';

export default class LoadingIndicator extends BaseComponent {
    static get properties() {
        return {
            loadingText: { type: String },
        };
    }

    constructor() {
        super();
        this.loadingText = LOADING_TEXT;
    }

    render() {
        return html`
            <div class="container">
                <div class="loader"></div>
                <p tabindex="0">${this.loadingText}</p>
            </div>
        `;
    }
}

customElements.define('loading-indicator', LoadingIndicator);
