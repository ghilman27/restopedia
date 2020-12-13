import 'regenerator-runtime';
import { html } from 'lit-element';
import { saveRestaurant, deleteRestaurant } from '../../store/restaurant/actions';
import renderToast from '../../utils/notifications';
import './like-button.scss';
import BaseComponent from '../../global/BaseComponent';

export default class LikeButton extends BaseComponent {
    static get properties() {
        return {
            favorite: { type: Boolean },
            restaurant: { type: Object },
        };
    }

    constructor() {
        super();
        this.favorite = false;
    }

    stateChanged(state) {
        const restaurant = state.restaurant[this.restaurant.id];
        this.favorite = !!restaurant;
    }

    async handleFavorite() {
        try {
            if (this.favorite) {
                await this.dispatchAction(deleteRestaurant(this.restaurant.id));
            } else {
                await this.dispatchAction(saveRestaurant(this.restaurant));
            }
            this.renderFavoriteNotification(this.restaurant.name);
        } catch (error) {
            this.renderToast(error);
        }
    }

    renderToast(message) {
        renderToast(message);
        return this;
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
}

customElements.define('like-button', LikeButton);
