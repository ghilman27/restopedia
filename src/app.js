import { LitElement, html, customElement} from 'lit-element';
import { connect } from 'pwa-helpers';
import store from './store';
import { setSavedRestaurants } from './store/restaurant/actions';
import './styles/app.scss';
import './components';
import './views';

@customElement('main-app')
export default class MainApp extends connect(store)(LitElement) {
    connectedCallback() {
        super.connectedCallback();
        store.dispatch(setSavedRestaurants());
    }

    render() {
        return html`
            <a href="#content" class="skip-link">Skip to content</a>
            <header>
                <app-shell></app-shell>
            </header>
            <main>
                <home-view></home-view>
                <favorite-view></favorite-view>
                <detail-view .restaurantId=${'w9pga3s2tubkfw1e867'}></detail-view>
            </main>
            <footer>
                <footer-bar></footer-bar>
            </footer>
        `;
    }

    createRenderRoot() {return this};
}