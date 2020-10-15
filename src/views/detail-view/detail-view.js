import API from '../../data/restaurantAPI';
import { LitElement, html, customElement, property} from 'lit-element';
import './detail-view.scss';
import './detail-view_responsive.scss';

@customElement('detail-view')
export default class DetailView extends LitElement {
    @property({type: String})
    restaurantId;

    @property({type: Object})
    restaurant;

    @property({type: Object})
    state = {
        descExtended: false,
    }

    connectedCallback() {
        super.connectedCallback()
        if (this.restaurantId) {
            this.fetchData();
        } else {
            throw new SyntaxError("restaurantId cannot be undefined");
        }
    }

    async fetchData() {
        this.restaurant = await API.getRestaurant(this.restaurantId);
        this.restaurant.imageUrl = `${process.env.API_URL_IMAGE_LARGE}/${this.restaurant.pictureId}`;
    }

    toggleDesc() {
        this.state = {...this.state, descExtended: !this.state.descExtended}
    }

    autoHeightInput(e) {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    }

    render() {
        if (this.restaurant) {
            return html`
                <hero-element 
                    id="jumbotron" 
                    .imageSrc=${this.restaurant.imageUrl}
                >
                </hero-element>

                <div id="content" class="content">
                    <div class="wrapper">

                        <section id="detail" class="detail">
                            <h1 class="detail__restaurant-name">${this.restaurant.name}</h1>
                            <p class="detail__address">
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
                                <span class="detail__category">${category.name}</span>
                                `)}
                            </div>
                            <p class="detail__desc ${this.state.descExtended ? "" : "clipped"}">
                                ${this.restaurant.description}
                            </p>
                            <button class="detail__toggle-desc" @click=${this.toggleDesc}>
                                ${this.state.descExtended ? "Read Less" : "Read More"}
                            </button>
                        </section>
    
                        <section id="menu" class="menu">
                            <h2 class="menu__title">Menu</h2>
                            <hr class="divider"/>
                            <div class="menu__wrapper">
                            ${Object.entries(this.restaurant.menus).map(([category, menus]) => html`
                                <div class="menu__list">
                                    <h3 class="menu__category">${category}</h3>
                                    <ul class="menu__items">
                                    ${menus.map(menu => html`
                                        <li class="menu__item">${menu.name}</li>
                                    `)}
                                    </ul>
                                </div>
                            `)}
                            </div>
                        </section>
    
                        <section id="reviews" class="reviews">
                            <h2 class="reviews__title">Reviews</h2>
                            <hr class="divider"/>

                            <div class="reviews__form">
                                <form class="form">
                                    <div class="form__main">
                                        <textarea 
                                            class="form__review"
                                            name="form-review" 
                                            id="form-review"
                                            @input=${this.autoHeightInput}
                                            placeholder="Add a public review ..."
                                            rows="1"
                                            required
                                        ></textarea>
                                    </div>
                                    <div class="form__footer">
                                        <input 
                                            class="form__name"
                                            name="form-name" 
                                            id="form-name"
                                            type="text" 
                                            placeholder="Name (required)"
                                            required
                                        >
                                        <div class="form__buttons">
                                            <button class="form__button cancel">
                                                Cancel
                                            </button>
                                            <button class="form__button submit" id="submit-review" type="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div class="reviews__main">
                            ${this.restaurant.consumerReviews.map((consumerReview) => html`
                                <div class="review">
                                    <div class="review__author-thumbnail">
                                        <i title="author-thumbnail" class="fa fa-user-circle"></i>
                                    </div>
                                    <div class="review__main">
                                        <div class="review__header">
                                            <span class="review__author">${consumerReview.name}</span>
                                            <span class="review__date">${consumerReview.date}</span>
                                        </div>
                                        <div class="review__body">
                                            <span class="review__content">${consumerReview.review}</span>
                                        </div>
                                    </div>
                                </div>
                            `)}
                            </div>
                        </section>

                    </div>
                </div>
            `;
        } else {
            return html`loading`;
        }
    }

    createRenderRoot() {
        return this;
    };
}