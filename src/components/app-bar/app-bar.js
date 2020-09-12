import { LitElement, html, customElement} from 'lit-element';


@customElement('app-bar')
export default class AppBar extends LitElement {
    render() {
        return html`
            <a href="#!" class="app-logo"></a>
            <button class="menu-btn">
                <span class="menu-btn__burger"></span>
            </button>
            <nav class="nav-drawer">
                <!-- profile detail for future release -->
                <ul class="nav-menu">
                    <li class="nav-menu__item">
                        <a href="#!" class="nav-menu__link">Home</a>
                    </li>
                    <li class="nav-menu__item">
                        <a href="#!" class="nav-menu__link">Favourite</a>
                    </li>
                    <li class="nav-menu__item">
                        <a href="#!" class="nav-menu__link">About Us</a>
                    </li>
                </ul>
            </nav>
        `;
    }

    createRenderRoot() {return this};
}