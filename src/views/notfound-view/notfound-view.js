import {
    LitElement, html, customElement, property,
} from 'lit-element';
import setSkipToContentHref from 'src/utils/skipToContent';
import './notfound-view.scss';

@customElement('notfound-view')
export default class NotFoundView extends LitElement {
    @property({ type: String })
    notFoundMessage = 'Page Not Found';

    @property({ type: Object })
    location;

    connectedCallback() {
        super.connectedCallback();
        this.setSkipToContentHref();
    }

    setSkipToContentHref() {
        setSkipToContentHref(this.location.pathname);
    }

    render() {
        return html`<div class="not-found" id="content">${this.notFoundMessage}</div>`;
    }

    createRenderRoot() {
        return this;
    }
}
