import {
    LitElement, html, customElement, property,
} from 'lit-element';
import './restaurant-info.scss';

@customElement('restaurant-info')
export default class RestaurantInfo extends LitElement {
    @property({ type: Object })
    restaurant;

    @property({ type: Boolean })
    descExtended = false;

    toggleDesc() {
        this.descExtended = !this.descExtended;
    }

    render() {
        return html`
            <h1 class="detail__restaurant-name" tabindex="0">${this.restaurant.name}</h1>
            <like-button class="detail__fav-button" .restaurant=${this.restaurant}></like-button>
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
