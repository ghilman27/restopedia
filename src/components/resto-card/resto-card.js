import { LitElement, html, customElement} from 'lit-element';


@customElement('resto-card')
export default class RestoCard extends LitElement {
    static get properties() {
        return {
            data: {type: Object},
        }
    }

    render() {
        return html`
            <div class="resto-card">
                <li class="resto-card__item">
                    <a href="#!" title="${this.data.name}">
                        <div class="resto-card__media">
                            <img src="${this.data.pictureId}" alt="${this.data.name}"/>
                        </div>
                        <div class="resto-card__content">
                            <h5 class="resto-card__title">${this.data.name}</h5>
                            <rating-bar rating=${this.data.rating}></rating-bar>
                            <p class="resto-card__city">${this.data.city}</p>
                            <p class="resto-card__description">${this.data.description}</p>
                        </div>
                    </a>
                </li>
            </div>
        `;
    }

    createRenderRoot() {return this};
}