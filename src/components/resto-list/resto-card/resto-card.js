import { html } from 'lit-element';
import { deleteRestaurant } from '../../../store/restaurant/actions';
import renderToast from '../../../utils/notifications';
import './resto-card.scss';
import BaseComponent from '../../../global/BaseComponent';
import ENV from '../../../global/env';

const IMAGE_BASE_URL = ENV.API_URL_IMAGE_SMALL;

export default class RestoCard extends BaseComponent {
    static get properties() {
        return {
            data: { type: Object },
            onHover: { type: Boolean },
            isFavorite: { type: Boolean },
            deleteButton: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.onHover = false;
        this.isFavorite = false;
        this.deleteButton = false;
    }

    connectedCallback() {
        super.connectedCallback();
        this.data.imageUrl = `${IMAGE_BASE_URL}/${this.data.pictureId}`;
        this.data.restaurantUrl = `restaurant/${this.data.id}`;
    }

    stateChanged(state) {
        this.isFavorite = state.restaurant[this.data.id];
    }

    handleHover(event) {
        event.stopPropagation();
        event.preventDefault();
        this.onHover = !this.onHover;
    }

    async handleDelete(event) {
        event.preventDefault();
        const restaurant = this.data;
        try {
            await this.dispatchAction(deleteRestaurant(restaurant.id));
            renderToast({ message: `${restaurant.name} has been deleted from favorite` });
        } catch (error) {
            renderToast(error);
        }
    }

    render() {
        const {
            name,
            restaurantUrl,
            imageUrl,
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
                    <img class="lazyload" src="${imageUrl}" alt="${name}" alt="card-media" crossorigin="anonymous"/>
                    <div class="overlay ${this.onHover ? 'hover' : ''}">
                        <div>Read More</div>
                    </div>
                </div>
                <div class="card__content">
                    <h3 class="resto__title" tabindex="0">${name}</h3>
                    <p class="resto__city" tabindex="0">${city}</p>
                    <rating-bar rating=${this.data.rating} tabindex="0" aria-label="rating ${rating}"></rating-bar>
                    <p class="resto__description" tabindex="0">${description}</p>
                </div>
                ${this.deleteButton ? html`
                    <button 
                        class="indicator__delete-btn"
                        @click=${this.handleDelete}
                        aria-label="delete restaurant ${name} from favorite"
                    >
                        <i class="fas fa-trash-alt"></i>
                    </button>
                ` : ''}
                ${this.isFavorite && !this.deleteButton ? html`
                    <div class="indicator__favorite" tabindex="0" aria-label="restaurant ${name} has been added to favorite">
                        <i class="fas fa-heart"></i>
                    </div>
                ` : ''}
            </a>
        `;
    }
}

customElements.define('resto-card', RestoCard);
