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
        this.imageSrc = '/images/hero-image_2.jpg';
        this.imageSrcSmall = '/images/hero-image_2-small.jpg';
        this.imageSrcLarge = '/images/hero-image_2-large.jpg';
        this.imageSrcWebp = '/images/hero-image_2.webp';
        this.imageSrcWebpSmall = '/images/hero-image_2-small.webp';
        this.imageSrcWebpLarge = '/images/hero-image_2-large.webp';
    }

    stateChanged(state) {
        this.user = state.global.user;
    }

    render() {
        return html`
        <div class="hero">
            <div class="hero__background">
                <picture>
                    <source 
                        type="image/webp"
                        src=${this.imageSrcWebp}
                        srcset="${this.imageSrcWebpSmall} 480w, ${this.imageSrcWebpLarge} 800w"
                        sizes="(max-width: 600px) 480px, 800px"
                    >
                    <source 
                        type="image/jpeg"
                        src=${this.imageSrc}
                        srcset="${this.imageSrcSmall} 480w, ${this.imageSrcLarge} 800w"
                        sizes="(max-width: 600px) 480px, 800px"
                    >
                    <img 
                        src=${this.imageSrc} 
                        srcset="${this.imageSrcSmall} 480w, ${this.imageSrcLarge} 800w"
                        sizes="(max-width: 600px) 480px, 800px"
                        alt="hero-background" 
                        crossorigin="anonymous"
                    />
                </picture>
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
