import FavoriteRestaurantIdb from 'src/data/db';
import { LitElement, html, customElement, property } from 'lit-element';
import './favorite-view.scss';

@customElement('favorite-view')
export default class FavoriteView extends LitElement {
	@property({ type: Array })
	restaurants = [];

	connectedCallback() {
		super.connectedCallback();
		this.getRestaurants();
	}

	async getRestaurants() {
		this.restaurants = await FavoriteRestaurantIdb.getRestaurants();
	}

	render() {
		if (this.restaurants.length) {
			return html`
				<hero-element
					id="jumbotron"
					.greeting=${true}
					.heading=${"Let's dive to your favorites!"}
				></hero-element>
                <div id="content" class="content">
                    <section id="recommended" class="section">
                        <resto-list 
                            .title=${"Favorite Restaurants"}
                            .data=${this.restaurants}
                        >
                        </resto-list>
                    </section>
                </div>
			`;
		} else {
			return html`You have no favorite restaurants`;
		}
	}

	createRenderRoot() {
		return this;
	}
}
