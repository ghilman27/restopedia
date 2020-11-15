import {
    LitElement, html, customElement, property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import store from 'src/store';
import './footer-bar.scss';

@customElement('footer-bar')
export default class FooterBar extends connect(store)(LitElement) {
    @property({ type: String })
    appName;

    stateChanged(state) {
        this.appName = state.global.appName;
    }

    render() {
        return html` <p tabindex="0">Copyright &#169; 2020 ${this.appName}</p> `;
    }

    createRenderRoot() {
        return this;
    }
}
