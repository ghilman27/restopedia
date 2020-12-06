import { html } from 'lit-element';
import _ from 'lodash';
import BaseView from '../base-view';
import './favorite-view.scss';

export default class FavoriteView extends BaseView {
    static get properties() {
        return {
            restaurants: { type: Array },
            pageTitle: { type: String },
        };
    }

    constructor() {
        super();
        this.pageTitle = 'favorites';
        this.restaurants = [];
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
}

customElements.define('favorite-view', FavoriteView);
