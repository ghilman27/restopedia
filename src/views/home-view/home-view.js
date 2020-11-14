import API from 'src/data/api';
import {
    LitElement, html, customElement, property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import store from 'src/store';
import { setSelectedPage } from 'src/store/shell/actions';
import renderErrorToast from 'src/utils/notifications';
import './home-view.scss';

@customElement('home-view')
export default class HomeView extends connect(store)(LitElement) {
    @property({ type: Array })
    data = [];

    @property({ type: String })
    pageTitle = 'home';

    connectedCallback() {
        super.connectedCallback();
        this.setSelectedPage();
        this.fetchData();
    }

    setSelectedPage() {
        store.dispatch(setSelectedPage(this.pageTitle));
    }

    async fetchData() {
        try {
            this.data = await API.getRestaurants();
        } catch (error) {
            this.handleFetchError(error);
        }
    }

    handleFetchError(error) {
        renderErrorToast(error, this);
    }

    render() {
        return html`
            ${this.data.length ? html`
                <hero-element
                    id="jumbotron"
                    .greeting=${true}
                    .heading=${"Let's explore foods near you"}
                ></hero-element>
                <div id="content" class="content">
                    <section id="recommended" class="section">
                        <resto-list title="recommended" .data=${this.data}>
                        </resto-list>
                    </section>
                </div>
            ` : html`<loading-indicator></loading-indicator>`}
        `;
    }

    createRenderRoot() {
        return this;
    }
}
