import { LitElement, html, customElement, property} from 'lit-element';
import './resto-card.scss';

@customElement('resto-card')
export default class RestoCard extends LitElement {

    @property({type: Object})
    data;

    @property({type: Boolean})
    onHover = false;

    handleHover(e) {
        e.stopPropagation();
        e.preventDefault();
        this.onHover = !this.onHover;
    }

    render() {
        return html`
            <a 
                href="#!" 
                tabindex="0"
                aria-label="${this.data.name}"
                title=${this.data.name}
                class="card ${this.onHover ? 'hover' : ''}"
                @mouseenter=${this.handleHover}
                @mouseleave=${this.handleHover}
            >
                <div class="card__media">
                    <img src="${this.data.pictureId}" alt="${this.data.name}"/>
                    <div class="overlay ${this.onHover ? 'hover' : ''}">
                        <div>Read More</div>
                    </div>
                </div>
                <div class="card__content">
                    <span class="resto__distance">${this.data.distance} km</span>
                    <h3 class="resto__title" tabindex="0">${this.data.name}</h3>
                    <p class="resto__city" tabindex="0">${this.data.city}</p>
                    <rating-bar rating=${this.data.rating} tabindex="0" aria-label="rating ${this.data.rating}"></rating-bar>
                    <p class="resto__description" tabindex="0">${this.data.description}</p>
                </div>
            </a>
        `;
    }

    createRenderRoot() {return this};
}