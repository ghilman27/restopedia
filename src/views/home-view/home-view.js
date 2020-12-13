import { html } from 'lit-element';
import API from '../../data/api';
import renderErrorToast from '../../utils/notifications';
import BaseView from '../base-view';
import './home-view.scss';

export default class HomeView extends BaseView {
    static get properties() {
        return {
            data: { type: Array },
            pageTitle: { type: String },
        };
    }

    constructor() {
        super();
        this.pageTitle = 'home';
        this.data = [];
    }

    connectedCallback() {
        super.connectedCallback();
        this.fetchData();
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
}

customElements.define('home-view', HomeView);
