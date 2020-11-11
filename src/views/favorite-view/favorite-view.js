import {
    LitElement, html, customElement, property,
} from 'lit-element';
import _ from 'lodash';
import { connect } from 'pwa-helpers';
import store from 'src/store';
import './favorite-view.scss';

@customElement('favorite-view')
export default class FavoriteView extends connect(store)(LitElement) {
    @property({ type: Array })
    restaurants = [];

    @property({ type: Boolean })
    requested = false;

    connectedCallback() {
        super.connectedCallback();
    }

    stateChanged(state) {
        this.restaurants = _.values(state.restaurant);
    }

    render() {
        return html`
            <hero-element
                id="jumbotron"
                .greeting=${true}
                .heading=${"Let's dive to your favorites!"}
            ></hero-element>
            <div id="content" class="content">
                ${this.restaurants.length ? html`
                <section id="recommended" class="section">
                    <resto-list
                        .title=${'Favorite Restaurants'}
                        .data=${this.restaurants}
                        .deleteButton=${true}
                    >
                    </resto-list>
                </section>
                ` : html`
                <div class="not-found">
                    <i class="far fa-file"></i>
                    <p tabindex="0">You have no favorite restaurants</p>
                </div>
                `}
            </div>
            `;
    }

    createRenderRoot() {
        return this;
    }
}
