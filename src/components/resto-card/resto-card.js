import {
    LitElement, html, customElement, property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import store from 'src/store';
import { deleteRestaurant } from 'src/store/restaurant/actions';
import './resto-card.scss';

const IMAGE_BASE_URL = process.env.API_URL_IMAGE_SMALL;

@customElement('resto-card')
export default class RestoCard extends connect(store)(LitElement) {
    @property({ type: Object })
    data;

    @property({ type: Boolean })
    onHover = false;

    @property({ type: Boolean })
    isFavorite = false;

    @property({ type: Boolean })
    deleteButton = false;

    handleHover(event) {
        event.stopPropagation();
        event.preventDefault();
        this.onHover = !this.onHover;
    }

    stateChanged(state) {
        this.isFavorite = state.restaurant[this.data.id];
    }

    async handleDelete(event) {
        event.preventDefault();
        try {
            await store.dispatch(deleteRestaurant(this.data.id));
        } catch (error) {
            /* eslint-disable no-console */
            console.log(error);
            /* eslint-enable no-console */
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.data.imageUrl = `${IMAGE_BASE_URL}/${this.data.pictureId}`;
        this.data.restaurantUrl = `restaurant/${this.data.id}`;
        this.data.distance = (Math.random() * 10).toFixed(2);
    }

    render() {
        const {
            name,
            restaurantUrl,
            imageUrl,
            distance,
            city,
            rating,
            description,
        } = this.data;

        return html`
            <a 
                href="${restaurantUrl}" 
                tabindex="0"
                aria-label="${name}"
                title=${name}
                class="card ${this.onHover ? 'hover' : ''}"
                @mouseenter=${this.handleHover}
                @mouseleave=${this.handleHover}
            >
                <div class="card__media">
                    <img src="${imageUrl}" alt="${name}" crossorigin="anonymous"/>
                    <div class="overlay ${this.onHover ? 'hover' : ''}">
                        <div>Read More</div>
                    </div>
                </div>
                <div class="card__content">
                    <span class="resto__distance">${distance} km</span>
                    <h3 class="resto__title" tabindex="0">${name}</h3>
                    <p class="resto__city" tabindex="0">${city}</p>
                    <rating-bar rating=${this.data.rating} tabindex="0" aria-label="rating ${rating}"></rating-bar>
                    <p class="resto__description" tabindex="0">${description}</p>
                </div>
                ${this.deleteButton ? html`
                    <button 
                        class="indicator__delete-btn"
                        @click=${this.handleDelete}
                    >
                        <i class="fas fa-trash-alt"></i>
                    </button>
                ` : ''}
                ${this.isFavorite && !this.deleteButton ? html`
                    <div class="indicator__favorite">
                        <i class="fas fa-heart"></i>
                    </div>
                ` : ''}
            </a>
        `;
    }

    createRenderRoot() { return this; }
}
