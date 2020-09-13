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
            <!-- <div class="resto-card">
                <li class="resto-card__item"> -->
                    <!-- <a href="#!" title="${this.data.name}"> -->
                        <div class="card__media">
                            <img src="${this.data.pictureId}" alt="${this.data.name}"/>
                        </div>
                        <div class="card__content">
                            <h4 class="resto__title">${this.data.name}</h4>
                            <rating-bar rating=${this.data.rating}></rating-bar>
                            <p class="resto__city">${this.data.city}</p>
                            <p class="resto__description">${this.data.description}</p>
                        </div>
                    <!-- </a> -->
                <!-- </li>
            </div> -->
        `;
    }

    createRenderRoot() {return this};
}