// import {} from './components';
import data from '../DATA.json';

class MainApp extends HTMLElement {
    constructor() {
        super();
        this._restos = [];
    }

    get restos() {
        return this._restos;
    }

    set restos(restos) {
        this._restos = restos;
    }

    connectedCallback() {
        this._restos = data;
        this.render();
    }

    render() {
        // Overall Structure
        // TODO: Implementation
        this.innerHTML = `
            <header>
                <hero-element>
                    <div>
                        <drawer-button></drawer-button>
                        <location-dropdown></location-dropdown>
                        <notification-button></notification-button>
                    </div>
                    <div>
                        <hero-text></hero-text>
                    </div>
                    <div>
                        <search-bar></search-bar>
                    </div>
                </hero-element>
                
                <nav>
                    <app-drawer></app-drawer>
                    <top-navigation></top-navigation>
                </nav>
            </header>

            <body>
                <recommended-carousel></recommended-carousel>
                <top-carousel></top-carousel>
                <resto-category></resto-category>
                <other-list></other-list>
            </body>
        `;
    }
}

customElements.define('main-app', MainApp)