import { LitElement, html, customElement} from 'lit-element';
import './hero-element.scss';
import './hero-element_responsive.scss';

@customElement('hero-element')
export default class HeroElement extends LitElement {
    render() {
        return html`
            <div class="hero__placeholder">
                <p class="hero__greeting">Good night,</p>
                <h1 class="hero__name">Ghilman</h1>
                <p class="hero__desc">Let's explore good foods near you!</p>
            </div>
            <!-- <div class="hero__search-bar"></div> -->
        `;
    }

    createRenderRoot() {return this};
}