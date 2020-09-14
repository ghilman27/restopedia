import { LitElement, html, customElement} from 'lit-element';

@customElement('footer-bar')
export default class FooterBar extends LitElement {
    render() {
        return html`
			<p tabindex="0">Copyright &#169; 2020 Restopedia</p>
        `;
    }

    createRenderRoot() {return this};
}