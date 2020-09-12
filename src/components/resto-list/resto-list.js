import { LitElement, html, customElement} from 'lit-element';


@customElement('resto-list')
export default class RestoList extends LitElement {
    static get properties() {
        return {
            title: {type: String},
            data: {type: Object},
        }
    }

    render() {
        console.log(this.data)
        return html`
            <h4 class="resto-list__title">${this.title}</h4>
            <div class="resto-list__items">
                ${this.data.map(resto => html`
                    <resto-card .data="${resto}"></resto-card>
                `)}
            </div>
        `;
    }

    createRenderRoot() {return this};
}