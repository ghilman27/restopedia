import {
    LitElement, html, customElement, property,
} from 'lit-element';
import './loading-indicator.scss';

const LOADING_TEXT = 'Loading Content';

@customElement('loading-indicator')
export default class LoadingIndicator extends LitElement {
    @property({ type: String })
    loadingText = LOADING_TEXT;

    render() {
        return html`
            <div class="container">
                <div class="loader"></div>
                <p tabindex="0">${this.loadingText}</p>
            </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}
