import data from '../../data/DATA.json';
import API from '../../data/restaurantAPI';
import { LitElement, html, customElement, property} from 'lit-element';
import './home-view.scss';

@customElement('home-view')
export default class HomeView extends LitElement {
    @property({type: Array})
    data = [];

    connectedCallback() {
        super.connectedCallback()
        this.fetchData();
    }

    async fetchData() {
        this.data = await API.getRestaurants();
    }

    render() {
        if (this.data.length) {
            return html`
                <hero-element id="jumbotron"></hero-element>
                <div id="content" class="content">
                    <section id="recommended" class="section">
                        <resto-list 
                            title="recommended" 
                            .data=${this.data}
                        >
                        </resto-list>
                    </section>
                </div>
            `;
        } else {
            return html`loading`;
        }
    }

    createRenderRoot() {
        return this;
    };
}