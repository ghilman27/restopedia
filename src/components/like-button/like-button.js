import {
    LitElement, html, customElement, property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import store from 'src/store';
import { saveRestaurant, deleteRestaurant } from 'src/store/restaurant/actions';
import renderToast from 'src/utils/notifications';
import './like-button.scss';

@customElement('like-button')
export default class LikeButton extends connect(store)(LitElement) {
    @property({ type: Boolean })
    favorite = false;

    @property({ type: Object })
    restaurant;

    stateChanged(state) {
        this.favorite = !!state.restaurant[this.restaurant.id];
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
            <button 
                @click=${this.handleFavorite} 
                tabindex="0" 
                aria-label="${this.favorite ? 'remove from favorite' : 'add to favorite'}">
                <i class=${this.favorite ? 'fas fa-heart favorite' : 'far fa-heart'}></i>
            </button>
        `;
    }

    createRenderRoot() {
        return this;
    }
}
