import { LitElement, html, customElement} from 'lit-element';
import './hero-element.scss';
import './hero-element_responsive.scss';

@customElement('hero-element')
export default class HeroElement extends LitElement {
    render() {
        return html`
            <div class="hero__placeholder">
                <p class="hero__greeting" tabindex="0">Good night,</p>
                <p class="hero__name" tabindex="0">Ghilman</p>
                <h1 class="hero__desc" tabindex="0">Let's explore good foods near you!</h1>
            </div>
        `;
    }

    createRenderRoot() {return this};
}