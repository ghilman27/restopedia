import { LitElement, html, customElement } from 'lit-element';
import { property } from 'lodash';
import './footer-bar.scss';

@customElement('footer-bar')
export default class FooterBar extends LitElement {
    @property({ type: String })
    appName = 'Restopedia';

    render() {
        return html` <p tabindex="0">Copyright &#169; 2020 ${this.appName}</p> `;
    }

    createRenderRoot() {
        return this;
    }
}
