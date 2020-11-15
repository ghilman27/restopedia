import { LitElement, property } from 'lit-element';
import { connect } from 'pwa-helpers';
import store from 'src/store';
import { setSelectedPage } from 'src/store/global/actions';
import setSkipToContentHref from 'src/utils/skipToContent';

export default class BaseView extends connect(store)(LitElement) {
    @property({ type: String })
    pageTitle;

    @property({ type: Object })
    location;

    connectedCallback() {
        super.connectedCallback();
        this.setSelectedPage();
        this.setSkipToContentHref();
    }

    setSelectedPage() {
        store.dispatch(setSelectedPage(this.pageTitle));
    }

    setSkipToContentHref() {
        setSkipToContentHref(this.location.pathname);
    }

    createRenderRoot() {
        return this;
    }
}
