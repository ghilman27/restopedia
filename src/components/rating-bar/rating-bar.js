import {
    LitElement, html, customElement, property,
} from 'lit-element';
import './rating-bar.scss';

const STAR_SCALES_ARRAY = [0, 1, 2, 3, 4];

@customElement('rating-bar')
export default class RatingBar extends LitElement {
    @property({ type: Number }) rating = 4;

    constructor() {
        super();
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

    createRenderRoot() { return this; }
}
