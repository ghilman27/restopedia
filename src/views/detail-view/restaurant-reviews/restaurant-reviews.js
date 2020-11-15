import API from 'src/data/api';
import {
    LitElement, html, customElement, property,
} from 'lit-element';
import renderToast from 'src/utils/notifications';
import './review-list/review-list';
import './restaurant-reviews.scss';
import './restaurant-reviews_responsive.scss';

@customElement('restaurant-reviews')
export default class RestaurantReviews extends LitElement {
    @property({ type: String })
    restaurantId;

    @property({ type: Array })
    reviews;

    @property({ type: Boolean })
    formOpen = false;

    @property({ type: Object })
    values = {
        customerReview: '',
        customerName: '',
    }

    handleChange(event) {
        this.values = {
            ...this.values,
            [event.target.name]: event.target.value,
        };
    }

    resetForm() {
        this.values = {
            customerReview: '',
            customerName: '',
        };
    }

    async updateReviews() {
        const updatedReviews = await API.postReview({
            id: this.restaurantId,
            name: this.values.customerName,
            review: this.values.customerReview,
        });
        this.reviews = updatedReviews;
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
        const textArea = event.target;
        textArea.style.height = 'auto';
        textArea.style.height = `${textArea.scrollHeight}px`;
    }

    handleFormFocus() {
        this.formOpen = true;
    }

    handleCancel(event) {
        event.preventDefault();
        this.formOpen = false;
    }

    render() {
        return html`
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
                            .value=${this.values.customerReview}
                            @input=${this.adjustInputHeight}
                            @change=${this.handleChange}
                            @focus=${this.handleFormFocus}
                        ></textarea>
                    </div>
                    ${this.formOpen ? html`
                    <div class="form__footer">
                        <input 
                            class="form__name"
                            name="customerName" 
                            id="customerName"
                            type="text" 
                            placeholder="Name (required)"
                            required
                            .value=${this.values.customerName}
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

            <div class="reviews__list">
                <review-list .reviews=${this.reviews}></review-list>
            </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}
