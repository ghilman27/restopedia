import API from 'src/data/api';
import RestaurantDB from 'src/data/db';
import { LitElement, html, customElement, property} from 'lit-element';
import { connect } from 'pwa-helpers';
import store from 'src/store';
import { saveRestaurant, deleteRestaurant } from 'src/store/restaurant/actions';
import './detail-view.scss';
import './detail-view_responsive.scss';

@customElement('detail-view')
export default class DetailView extends connect(store)(LitElement) {
    @property({type: String})
    restaurantId;

    @property({type: Object})
    restaurant;

    @property({type: Boolean})
    favorite = false;

    @property({type: Object})
    state = {
        descExtended: false,
        customerReview: '',
        customerName: '',
        formOpened: false,
    }

    stateChanged(state) {
        this.favorite = state.restaurant[this.restaurantId] ? true : false;
    }

    connectedCallback() {
        super.connectedCallback()
        if (this.restaurantId) {
            this.fetchData();
        } else {
            const error = new SyntaxError("restaurantId cannot be undefined");
            this.handleFetchError(error);
        }
    }

    async fetchData() {
        try {
            this.restaurant = await API.getRestaurant(this.restaurantId);
            this.restaurant.imageUrl = `${process.env.API_URL_IMAGE_LARGE}/${this.restaurant.pictureId}`;
        } catch (error) {
            this.handleSubmitError(error);
        }
    }

    toggleDesc() {
        this.state = {
            ...this.state, 
            descExtended: !this.state.descExtended
        };
    }

    handleChange(event) {
        this.state = {
            ...this.state, 
            [event.target.name]: event.target.value
        };
    }

    resetForm() {
        this.state = {
            ...this.state,
            customerReview: '',
            customerName: '',
        }
    }

    async updateReviews() {
        const updatedReviews = await API.postReview({
            id: this.restaurantId,
            name: this.state.customerName,
            review: this.state.customerReview,
        });
        this.restaurant.customerReviews = updatedReviews;
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            await this.updateReviews();
            this.resetForm();
        } catch (error) {
            this.handleSubmitError(error);
        }
    }

    adjustInputHeight(event) {
        event.target.style.height = "auto";
        event.target.style.height = event.target.scrollHeight + "px";
    }

    handleFormFocus() {
        this.state = {
            ...this.state,
            formOpened: true,
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.state = {
            ...this.state,
            formOpened: false,
        }
    }

    async handleFavorite() {
        try {
            this.favorite
                ? await store.dispatch(deleteRestaurant(this.restaurantId))
                : await store.dispatch(saveRestaurant(this.restaurant))
        } catch (error) {
            this.handleFavoriteError(error);
        }
    }

    handleSubmitError(error) {
        // TODO
        console.log(error);
    }

    handleFetchError(error) {
        // TODO
        console.log(error);
    }

    handleFavoriteError(error) {
        // TODO
        console.log(error);
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
                            <h1 class="detail__restaurant-name" tabindex="0">${this.restaurant.name}</h1>
                            <button class="detail__fav-button" @click=${this.handleFavorite} tabindex="0" aria-label="favorite">
                                <i class=${this.favorite ? "fas fa-heart favorite" : "far fa-heart"}></i>
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
                            <p class="detail__desc ${this.state.descExtended ? "" : "clipped"}" tabindex="0">
                                ${this.restaurant.description}
                            </p>
                            <button class="detail__toggle-desc" @click=${this.toggleDesc}>
                                ${this.state.descExtended ? "Read Less" : "Read More"}
                            </button>
                        </section>
    
                        <section id="menu" class="menu">
                            <h2 class="menu__title" tabindex="0">Menu</h2>
                            <hr class="divider"/>
                            <div class="menu__wrapper">
                            ${Object.entries(this.restaurant.menus).map(([category, menus]) => html`
                                <div class="menu__list">
                                    <h3 class="menu__category" tabindex="0">${category}</h3>
                                    <ul class="menu__items">
                                    ${menus.map(menu => html`
                                        <li class="menu__item" tabindex="0">${menu.name}</li>
                                    `)}
                                    </ul>
                                </div>
                            `)}
                            </div>
                        </section>
    
                        <section id="reviews" class="reviews">
                            <h2 class="reviews__title" tabindex="0">Reviews</h2>
                            <hr class="divider"/>

                            <div class="reviews__form">
                                <form class="form" @submit=${this.handleSubmit}>
                                    <div class="form__main">
                                        <textarea 
                                            class="form__review"
                                            name="customerReview" 
                                            id="customerReview"
                                            placeholder="Add a public review"
                                            aria-label="Add a public review"
                                            rows="1"
                                            required
                                            .value=${this.state.customerReview}
                                            @input=${this.adjustInputHeight}
                                            @change=${this.handleChange}
                                            @focus=${this.handleFormFocus}
                                        ></textarea>
                                    </div>
                                    ${this.state.formOpened ? html`
                                    <div class="form__footer">
                                        <input 
                                            class="form__name"
                                            name="customerName" 
                                            id="customerName"
                                            type="text" 
                                            placeholder="Name (required)"
                                            required
                                            .value=${this.state.customerName}
                                            @change=${this.handleChange}
                                        >
                                        <div class="form__buttons">
                                            <button class="form__button cancel" @click=${this.handleCancel}>
                                                Cancel
                                            </button>
                                            <button class="form__button submit" id="submit-review" type="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                    ` : ''}
                                </form>
                            </div>

                            <div class="reviews__main">
                            ${this.restaurant.customerReviews.map(({ name, date, review }) => html`
                                <div class="review">
                                    <div class="review__author-thumbnail">
                                        <i title="${name}-profile-picture" class="fa fa-user-circle" tabindex="0"></i>
                                    </div>
                                    <div class="review__main">
                                        <div class="review__header">
                                            <span class="review__author" tabindex="0">${name}</span>
                                            <span class="review__date" tabindex="0">${date}</span>
                                        </div>
                                        <div class="review__body">
                                            <span class="review__content" tabindex="0">${review}</span>
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