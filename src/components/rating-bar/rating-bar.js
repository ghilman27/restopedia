import { LitElement, html, customElement, property} from 'lit-element';
import './rating-bar.scss';

@customElement('rating-bar')
export default class RatingBar extends LitElement {
    @property({type: Number}) rating = 4;

    constructor() {
        super();
        this.starScales = [0, 1, 2, 3, 4];
    }

    render() {
        return html`
            <div class="base-ratings">
                ${this.starScales.map(() => html`
                    <i class="fas fa-star base-star"></i>
                `)}
            </div>

            <div class="gold-ratings">
                ${this.starScales.map((scale) => {
                    if (this.rating < scale + 0.5) return;
                    
                    const notFull = this.rating < scale + 1;
                    return html`
                        <i class="fas fa-star${notFull ? '-half' : ''} gold-star"></i>
                    `;
                })}
            </div>
        `;
    }

    createRenderRoot() {return this};
}