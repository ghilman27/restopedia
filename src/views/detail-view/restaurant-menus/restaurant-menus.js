import {
    LitElement, html, customElement, property,
} from 'lit-element';
import './restaurant-menus.scss';
import './restaurant-menus_responsive.scss';

@customElement('restaurant-menus')
export default class RestaurantMenus extends LitElement {
    @property({ type: Object })
    menus;

    render() {
        return html`
            <h2 class="menu__title" tabindex="0">Menu</h2>
            <hr class="divider"/>
            <div class="menu__wrapper">
            ${Object.entries(this.menus).map(([category, menus]) => html`
                <div class="menu__list">
                    <h3 class="menu__category" tabindex="0">${category}</h3>
                    <ul class="menu__items">
                    ${menus.map((menu) => html`
                        <li class="menu__item" tabindex="0">${menu.name}</li>
                    `)}
                    </ul>
                </div>
            `)}
            </div>
        `;
    }

    createRenderRoot() {
        return this;
    }
}
