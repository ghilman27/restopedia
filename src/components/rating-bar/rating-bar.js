import { html } from 'lit-element';
import './rating-bar.scss';
import BaseComponent from '../../global/BaseComponent';

const STAR_SCALES_ARRAY = [0, 1, 2, 3, 4];

export default class RatingBar extends BaseComponent {
    static get properties() {
        return {
            rating: { type: Number },
        };
    }

    constructor() {
        super();
        this.rating = 4;
        this.starScales = STAR_SCALES_ARRAY;
    }

    render() {
        return html`
        <div class="base-ratings">
            ${this.starScales.map(() => html`
                <i class="fas fa-star base-star"></i>
            `)}
            <span class="rating-text">(${this.rating})</span>
        </div>

        <div class="gold-ratings">
        ${this.starScales.map((scale) => {
        const notFull = this.rating < scale + 1;
        if (this.rating < scale + 0.5) return '';
        return html`
            <i class="fas fa-star${notFull ? '-half' : ''} gold-star"></i>
        `;
    })}
        </div>
        `;
    }
}

customElements.define('rating-bar', RatingBar);
