import { LitElement, html, customElement} from 'lit-element';
import './resto-list.scss';
import './resto-list_responsive.scss';


@customElement('resto-list')
export default class RestoList extends LitElement {
    static get properties() {
        return {
            title: {type: String},
            data: {type: Object},
        }
    }

    render() {
        return html`
            <h2 class="list-title">${this.title}</h2>
            <div class="list-items">
                ${this.data.map(resto => html`
                    <resto-card .data="${resto}"></resto-card>
                `)}
            </div>
        `;
    }

    createRenderRoot() {return this};
}