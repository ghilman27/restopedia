import data from '../data/DATA.json';
import { LitElement, html, css, customElement} from 'lit-element';
import { HeroElement } from '../components';

@customElement('home-view')
export default class HomeView extends LitElement {
    constructor() {
        super();
        this.recommended = data.restaurants.recommended;
        this.explore = data.restaurants.explore;
    }

    render() {
        return html`
            <div id="home-hero">
                <hero-element></hero-element>
            </div>

            <div id="home-content">
                <section id="home-recommended">
                    <resto-list 
                        title="recommended" 
                        .data=${this.recommended}
                    >
                    </resto-list>
                </section>

                <section id="home-explore">
                    <resto-list 
                        title="explore" 
                        .data=${this.explore}
                    >
                    </resto-list>
                </section>
            </div>
        `;
    }

    createRenderRoot() {
        return this;
    };
}