import {
    LitElement, html, customElement, property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import store from '../../../../store';
import './review-list.scss';
import './review-list_responsive.scss';

@customElement('review-list')
export default class ReviewList extends connect(store)(LitElement) {
    @property({ type: Array })
    reviews;

    render() {
        return html`
            ${this.reviews.map(({ name, date, review }) => html`
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
        `;
    }

    createRenderRoot() {
        return this;
    }
}
