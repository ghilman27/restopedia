import { html } from 'lit-element';
import BaseView from '../base-view';
import './notfound-view.scss';

export default class NotFoundView extends BaseView {
    static get properties() {
        return {
            notFoundMessage: { type: String },
            pageTitle: { type: String },
        };
    }

    constructor() {
        super();
        this.pageTitle = 'notfound';
        this.notFoundMessage = 'Page Not Found';
    }

    render() {
        return html`<div class="not-found" id="content">${this.notFoundMessage}</div>`;
    }
}

customElements.define('notfound-view', NotFoundView);
