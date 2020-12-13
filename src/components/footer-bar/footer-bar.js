import { html } from 'lit-element';
import './footer-bar.scss';
import BaseComponent from '../../global/BaseComponent';

export default class FooterBar extends BaseComponent {
    static get properties() {
        return {
            appName: { type: String },
        };
    }

    stateChanged(state) {
        this.appName = state.global.appName;
    }

    render() {
        return html`
            <p tabindex="0">Copyright &#169; 2020 ${this.appName}</p>
        `;
    }
}

customElements.define('footer-bar', FooterBar);
