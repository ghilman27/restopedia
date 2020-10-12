import { LitElement, html, customElement, property} from 'lit-element';
import './hero-element.scss';
import './hero-element_responsive.scss';

@customElement('hero-element')
export default class HeroElement extends LitElement {
    @property({type: String})
    imageSrc = "/images/heros/hero-image_2.jpg";

    render() {
        return html`
        <div class="hero">
            <div class="hero__background">
                <img src="${this.imageSrc}"/>
            </div>
            <div class="hero__placeholder">
                <p class="hero__greeting" tabindex="0">Good night,</p>
                <p class="hero__name" tabindex="0">Ghilman</p>
                <h1 class="hero__desc" tabindex="0">Let's explore good foods near you!</h1>
            </div>
        </div>
        `;
    }

    createRenderRoot() {return this};
}