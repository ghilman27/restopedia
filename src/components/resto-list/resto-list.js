import { html } from 'lit-element';
import './resto-card/resto-card';
import './resto-list.scss';
import './resto-list_responsive.scss';
import BaseComponent from '../../global/BaseComponent';

export default class RestoList extends BaseComponent {
    static get properties() {
        return {
            title: { type: String },
            data: { type: Object },
            deleteButton: { type: Boolean },
        };
    }

    render() {
        return html`
            <h2 class="list-title" tabindex="0">${this.title}</h2>
            <div class="list-items">
                ${this.data.map((resto) => html`
                    <resto-card .data="${resto}" .deleteButton=${this.deleteButton}></resto-card>
                `)}
            </div>
        `;
    }
}

customElements.define('resto-list', RestoList);
