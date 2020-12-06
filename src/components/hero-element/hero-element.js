import {
    LitElement, html, customElement, property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import store from '../../store';
import decideGreeting from '../../utils/greetings';
import './hero-element.scss';
import './hero-element_responsive.scss';

@customElement('hero-element')
export default class HeroElement extends connect(store)(LitElement) {
    @property({ type: String })
    imageSrc = '/images/heros/hero-image_2.jpg';

    @property({ type: Boolean })
    greeting = false;

    @property({ type: String })
    heading = '';

    @property({ type: Object })
    user;

    stateChanged(state) {
        this.user = state.global.user;
    }

    render() {
        return html`
        <div class="hero">
            <div class="hero__background">
                <img src="${this.imageSrc}" alt="hero-background" crossorigin="anonymous"/>
            </div>

            ${this.greeting ? html`
            <div class="greeting">
                <p class="greeting__say" tabindex="0">${decideGreeting()},</p>
                <p class="greeting__name" tabindex="0">${this.user.firstname}</p>
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
