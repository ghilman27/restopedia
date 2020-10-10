import data from '../../data/DATA.json';
import { LitElement, html, customElement} from 'lit-element';
import './home-view.scss';

@customElement('home-view')
export default class HomeView extends LitElement {
    constructor() {
        super();
        this.recommended = data.restaurants.recommended;
        this.toppicks = data.restaurants.toppicks;
    }

    render() {
        return html`
            <hero-element id="jumbotron"></hero-element>
            <div id="content" class="content">
                <section id="recommended" class="section">
                    <resto-list 
                        title="recommended" 
                        .data=${this.recommended}
                    >
                    </resto-list>
                </section>

                <section id="top-picks" class="section">
                    <resto-list 
                        title="top picks" 
                        .data=${this.toppicks}
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