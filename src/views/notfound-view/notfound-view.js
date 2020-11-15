import {
    html, customElement, property,
} from 'lit-element';
import BaseView from 'src/views/base-view';
import './notfound-view.scss';

@customElement('notfound-view')
export default class NotFoundView extends BaseView {
    @property({ type: String })
    notFoundMessage = 'Page Not Found';

    @property({ type: String })
    pageTitle = 'notfound';

    render() {
        return html`<div class="not-found" id="content">${this.notFoundMessage}</div>`;
    }
}
