import { LitElement, html, customElement} from 'lit-element';
import './styles/app.scss';
import './components';
import './views';

@customElement('main-app')
export default class MainApp extends LitElement {
    render() {
        return html`
            <a href="#content" class="skip-link">Skip to content</a>
            <header>
                <app-shell></app-shell>
            </header>
            <main>
                <home-view></home-view>
            </main>
            <footer>
                <footer-bar></footer-bar>
            </footer>
        `;
    }

    createRenderRoot() {return this};
}