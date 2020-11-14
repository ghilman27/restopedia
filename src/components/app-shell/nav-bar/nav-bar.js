import {
    LitElement, html, customElement, property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import store from 'src/store';
import { setDropdownOpen } from 'src/store/shell/actions';
import './user-dropdown/user-dropdown';
import './nav-bar.scss';
import './nav-bar_responsive.scss';

@customElement('nav-bar')
export default class NavBar extends connect(store)(LitElement) {
    @property({ type: Boolean })
    dropdownOpen;

    @property({ type: Object })
    user;

    @property({ type: Array })
    navMenus;

    @property({ type: String })
    selectedPage;

    stateChanged(state) {
        this.dropdownOpen = state.shell.dropdownOpen;
        this.user = state.shell.user;
        this.navMenus = state.shell.navMenus;
        this.selectedPage = state.shell.selectedPage;
    }

    toggleDropdown(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.dropdownOpen) {
            store.dispatch(setDropdownOpen(false));
        } else {
            store.dispatch(setDropdownOpen(true));
        }
    }

    render() {
        return html`
            <nav class="nav-drawer-desktop">
                <ul class="nav-desktop">
                    ${this.navMenus.map((item) => html`
                    <li class="nav-desktop__item ${this.selectedPage === item.name ? 'selected' : ''}">
                        <a href=${item.link} target=${item.newtab ? '_blank' : '_self'} class="nav-desktop__link">
                            <i class=${item.icon}></i>
                            <span>${item.name}</span>
                        </a>
                    </li>
                    `)}

                    <li class="nav-desktop__item">
                        <button 
                            @click=${this.toggleDropdown} 
                            class="nav-desktop__link ${this.dropdownOpen ? 'open' : ''}"
                            aria-haspopup="true" 
                            aria-expanded=${this.dropdownOpen ? 'true' : 'false'}
                        >
                            <img 
                                @click=${this.toggleDropdown} 
                                src=${this.user.photo} 
                                alt="${this.user.firstname} ${this.user.lastname} profile" 
                                class="nav-desktop__photo"
                                crossorigin="anonymous"
                            >
                        </button>
                        <user-dropdown></user-dropdown>
                    </li>
                </ul>
            </nav>
        `;
    }

    createRenderRoot() { return this; }
}
