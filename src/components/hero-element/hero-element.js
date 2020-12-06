import { html } from 'lit-element';
import decideGreeting from '../../utils/greetings';
import './hero-element.scss';
import './hero-element_responsive.scss';
import BaseComponent from '../../global/BaseComponent';

export default class HeroElement extends BaseComponent {
    static get properties() {
        return {
            greeting: { type: Boolean },
            heading: { type: String },
            imageSrc: { type: String },
            user: { type: Object },
        };
    }

    constructor() {
        super();
        this.greeting = false;
        this.heading = '';
        this.imageSrc = '/images/heros/hero-image_2.jpg';
    }

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
}

customElements.define('hero-element', HeroElement);
