import {
    LitElement, html, customElement, property,
} from 'lit-element';
import './hero-element.scss';
import './hero-element_responsive.scss';

@customElement('hero-element')
export default class HeroElement extends LitElement {
    @property({ type: String })
    imageSrc = '/images/heros/hero-image_2.jpg';

    @property({ type: Boolean })
    greeting = false;

    @property({ type: String })
    heading = '';

    render() {
        return html`
        <div class="hero">
            <div class="hero__background">
                <img src="${this.imageSrc}" alt="hero-background" crossorigin="anonymous"/>
            </div>

            ${this.greeting ? html`
            <div class="greeting">
                <p class="greeting__say" tabindex="0">Good night,</p>
                <p class="greeting__name" tabindex="0">Ghilman</p>
            </div>
            ` : ''}

            ${this.heading && html`
            <h1 class="hero__heading" tabindex="0">
                ${this.heading}
            </h1>`}
        </div>
        `;
    }

    createRenderRoot() { return this; }
}
