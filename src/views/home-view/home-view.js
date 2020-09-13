import data from '../../data/DATA.json';
import { LitElement, html, customElement} from 'lit-element';
import '../../components';
import './home-view.scss';

@customElement('home-view')
export default class HomeView extends LitElement {
    constructor() {
        super();
        this.recommended = data.restaurants.recommended;
        this.explore = data.restaurants.explore;
    }

    render() {
        return html`
            <hero-element id="jumbotron"></hero-element>
            <div id="content" class="home-view__content">
                <section id="recommended" class="home-view__section">
                    <resto-list 
                        title="recommended" 
                        .data=${this.recommended}
                    >
                    </resto-list>
                </section>

                <section id="explore" class="home-view__section">
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