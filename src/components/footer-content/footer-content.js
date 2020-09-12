import { LitElement, html, customElement} from 'lit-element';

@customElement('footer-content')
export default class FooterContent extends LitElement {
    render() {
        return html`
            <div class="footer">
                <p>Copyright &#169; 2020 Restopedia</p>
            </div>
        `;
    }

    createRenderRoot() {return this};
}