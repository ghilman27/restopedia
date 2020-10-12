import { LitElement, html, customElement, property} from 'lit-element';
import './resto-card.scss';

const IMAGE_BASE_URL = process.env.API_URL_IMAGE_SMALL;

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

    connectedCallback() {
        super.connectedCallback();
        this.data.imageUrl = `${IMAGE_BASE_URL}/${this.data.pictureId}`;
        this.data.restaurantUrl = `restaurant/${this.data.id}`;
        this.data.distance = (Math.random() * 10).toFixed(2);
    }

    render() {
        return html`
            <a 
                href="${this.data.restaurantUrl}" 
                tabindex="0"
                aria-label="${this.data.name}"
                title=${this.data.name}
                class="card ${this.onHover ? 'hover' : ''}"
                @mouseenter=${this.handleHover}
                @mouseleave=${this.handleHover}
            >
                <div class="card__media">
                    <img src="${this.data.imageUrl}" alt="${this.data.name}"/>
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