import API from 'src/data/api';
import {
    LitElement, html, customElement, property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import store from 'src/store';
import { setSelectedPage } from 'src/store/shell/actions';
import renderToast from 'src/utils/notifications';
import './restaurant-info/restaurant-info';
import './restaurant-menus/restaurant-menus';
import './detail-view.scss';
import './detail-view_responsive.scss';

@customElement('detail-view')
export default class DetailView extends connect(store)(LitElement) {
    @property({ type: Object })
    location;

    @property({ type: String })
    restaurantId;

    @property({ type: Object })
    restaurant;

    @property({ type: String })
    pageTitle = 'detail';

    @property({ type: Object })
    state = {
        customerReview: '',
        customerName: '',
        formOpened: false,
    }

    connectedCallback() {
        super.connectedCallback();
        this.restaurantId = this.location.params.id;
        this.setSelectedPage();
        this.fetchData();
    }

    setSelectedPage() {
        store.dispatch(setSelectedPage(this.pageTitle));
    }

    async fetchData() {
        try {
            this.restaurant = await API.getRestaurant(this.restaurantId);
            this.restaurant.imageUrl = `${process.env.API_URL_IMAGE_LARGE}/${this.restaurant.pictureId}`;
        } catch (error) {
            this.renderToast(error);
        }
    }

    handleChange(event) {
        this.state = {
            ...this.state,
            [event.target.name]: event.target.value,
        };
    }

    resetForm() {
        this.state = {
            ...this.state,
            customerReview: '',
            customerName: '',
        };
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
            this.renderToast({ message: 'Submit Review Success' });
            this.resetForm();
        } catch (error) {
            this.renderToast(error);
        }
    }

    renderToast = (message) => {
        renderToast(message);
    }

    adjustInputHeight = (event) => {
        const inputText = event.target;
        inputText.style.height = 'auto';
        inputText.style.height = `${inputText.scrollHeight}px`;
    }

    handleFormFocus() {
        this.state = {
            ...this.state,
            formOpened: true,
        };
    }

    handleCancel(event) {
        event.preventDefault();
        this.state = {
            ...this.state,
            formOpened: false,
        };
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
            ` : html`<loading-indicator></loading-indicator>`}
        `;
    }

    createRenderRoot() {
        return this;
    }
}
