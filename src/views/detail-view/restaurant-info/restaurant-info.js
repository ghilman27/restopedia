import {
    LitElement, html, customElement, property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import store from 'src/store';
import { saveRestaurant, deleteRestaurant } from 'src/store/restaurant/actions';
import renderToast from 'src/utils/notifications';
import './restaurant-info.scss';

@customElement('restaurant-info')
export default class RestaurantInfo extends connect(store)(LitElement) {
    @property({ type: Object })
    restaurant;

    @property({ type: Boolean })
    descExtended = false;

    @property({ type: Boolean })
    favorite = false;

    stateChanged(state) {
        this.favorite = !!state.restaurant[this.restaurant.id];
    }

    toggleDesc() {
        this.descExtended = !this.descExtended;
    }

    async handleFavorite() {
        try {
            if (this.favorite) {
                await store.dispatch(deleteRestaurant(this.restaurant.id));
            } else {
                await store.dispatch(saveRestaurant(this.restaurant));
            }
            this.renderFavoriteNotification(this.restaurant.name);
        } catch (error) {
            this.renderToast(error);
        }
    }

    renderToast = (message) => {
        renderToast(message);
    }

    renderFavoriteNotification(restaurantName) {
        if (this.favorite) {
            this.renderToast({ message: `${restaurantName} has been added to favorite` });
        } else {
            this.renderToast({ message: `${restaurantName} has been deleted from favorite` });
        }
    }

    render() {
        return html`
            <h1 class="detail__restaurant-name" tabindex="0">${this.restaurant.name}</h1>
            <button class="detail__fav-button" @click=${this.handleFavorite} tabindex="0" aria-label="favorite">
                <i class=${this.favorite ? 'fas fa-heart favorite' : 'far fa-heart'}></i>
            </button>
            <p class="detail__address" tabindex="0">
                ${`${this.restaurant.address}, ${this.restaurant.city}`}
            </p>
            <rating-bar 
                class="detail__rating" 
                rating=${this.restaurant.rating} 
                tabindex="0" 
                aria-label="rating ${this.restaurant.rating}"
            ></rating-bar>
            <div class="detail__categories">
                ${this.restaurant.categories.map((category) => html`
                <span class="detail__category" tabindex="0" aria-label="category ${category.name}">${category.name}</span>
                `)}
            </div>
            <p class="detail__desc ${this.descExtended ? '' : 'clipped'}" tabindex="0">
                ${this.restaurant.description}
            </p>
            <button class="detail__toggle-desc" @click=${this.toggleDesc}>
                ${this.descExtended ? 'Read Less' : 'Read More'}
            </button>
        `;
    }

    createRenderRoot() {
        return this;
    }
}
