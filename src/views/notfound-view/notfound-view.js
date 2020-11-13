import {
    LitElement, html, customElement, property,
} from 'lit-element';
import './notfound-view.scss';

@customElement('notfound-view')
export default class NotFoundView extends LitElement {
    @property({ type: String })
    notFoundMessage = 'Page Not Found';

    render() {
        return html`<div class="not-found">${this.notFoundMessage}</div>`;
    }

    createRenderRoot() {
        return this;
    }
}
