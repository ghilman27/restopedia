import API from 'src/data/api';
import {
    html, customElement, property,
} from 'lit-element';
import renderToast from 'src/utils/notifications';
import BaseView from 'src/views/base-view';
import './restaurant-info/restaurant-info';
import './restaurant-menus/restaurant-menus';
import './restaurant-reviews/restaurant-reviews';
import './detail-view.scss';

@customElement('detail-view')
export default class DetailView extends BaseView {
    @property({ type: Object })
    restaurant;

    @property({ type: String })
    pageTitle = 'detail';

    connectedCallback() {
        super.connectedCallback();
        this.fetchData();
    }

    renderToast = (message) => {
        renderToast(message);
    }

    async fetchData() {
        const restaurantId = this.location.params.id;
        try {
            this.restaurant = await API.getRestaurant(restaurantId);
            this.restaurant.imageUrl = `${process.env.API_URL_IMAGE_LARGE}/${this.restaurant.pictureId}`;
        } catch (error) {
            this.renderToast(error);
        }
    }

    render() {
        return html`
            ${this.restaurant ? html`
                <hero-element 
                    id="jumbotron" 
                    .imageSrc=${this.restaurant.imageUrl}
                >
                </hero-element>

                <div id="content" class="content">
                    <div class="wrapper">

                        <section id="detail" class="detail">
                            <restaurant-info .restaurant=${this.restaurant}></restaurant-info>
                        </section>

                        <section id="menu" class="menu">
                            <restaurant-menus .menus=${this.restaurant.menus}></restaurant-menus>
                        </section>

                        <section id="reviews" class="reviews">
                            <restaurant-reviews
                                .restaurantId=${this.restaurant.id}
                                .reviews=${this.restaurant.customerReviews}
                            ></restaurant-reviews>
                        </section>

                    </div>
                </div>
            ` : html`<loading-indicator></loading-indicator>`}
        `;
    }
}
