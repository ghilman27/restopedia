import { LitElement, html, customElement} from 'lit-element';


@customElement('hero-element')
export default class HeroElement extends LitElement {
    render() {
        return html`
            <div class="hero">
                <h4 class="hero__greeting">Good night,</h4>
                <h2 class="hero__name">Ghilman</h2>
                <h4 class="hero__desc">Let's explore some good foods near you!</h4>
            </div>
        `;
    }

    createRenderRoot() {return this};
}