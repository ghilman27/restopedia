import {
    LitElement, html, customElement, property,
} from 'lit-element';
import './loading-indicator.scss';

@customElement('loading-indicator')
export default class LoadingIndicator extends LitElement {
    @property({ type: String })
    loadingText = 'Loading Content ...';

    render() {
        return html`
            <div class="container">
                <div class="loader"></div>
                <p>${this.loadingText}</p>
            </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}
