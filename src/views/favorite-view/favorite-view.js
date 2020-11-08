import FavoriteRestaurantIdb from 'src/data/db';
import { LitElement, html, customElement, property } from 'lit-element';
import './favorite-view.scss';

@customElement('favorite-view')
export default class FavoriteView extends LitElement {
	@property({ type: Array })
	restaurants = [];

	@property({type: Boolean})
	requested = false;

	connectedCallback() {
		super.connectedCallback();
		this.getRestaurants();
	}

	async getRestaurants() {
		this.requested = false;
		try {
			this.restaurants = await FavoriteRestaurantIdb.getRestaurants();
			this.requested = true;
		} catch (error) {
			// TODO ERROR HANDLING
			console.log(error);
		}
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
		} else if (this.requested) {
			// TODO
			return html`You have no favorite restaurants`;
		} else {
			// TODO
			return html`Loading`;
		}
	}

	createRenderRoot() {
		return this;
	}
}
