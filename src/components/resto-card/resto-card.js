import { LitElement, html, customElement} from 'lit-element';
import './resto-card.scss';

@customElement('resto-card')
export default class RestoCard extends LitElement {
    static get properties() {
        return {
            data: {type: Object},
        }
    }

    render() {
        return html`
            <div class="card__media">
                <img src="${this.data.pictureId}" alt="${this.data.name}"/>
            </div>
            <div class="card__content">
                <h3 class="resto__title">${this.data.name}</h3>
                <p class="resto__city">${this.data.city}</p>
                <rating-bar rating=${this.data.rating}></rating-bar>
                <p class="resto__description">${this.data.description}</p>
            </div>
        `;
    }

    createRenderRoot() {return this};
}