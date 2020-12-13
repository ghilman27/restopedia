import { setSelectedPage } from '../../store/global/actions';
import setSkipToContentHref from '../../utils/skipToContent';
import BaseComponent from '../../global/BaseComponent';

export default class BaseView extends BaseComponent {
    static get properties() {
        return {
            pageTitle: { type: String },
            location: { type: Object },
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.setSelectedPage();
        this.setSkipToContentHref();
    }

    setSelectedPage() {
        this.dispatchAction(setSelectedPage(this.pageTitle));
    }

    setSkipToContentHref() {
        setSkipToContentHref(this.location.pathname);
    }
}
