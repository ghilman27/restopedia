import {
    LitElement, html, customElement, property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import store from 'src/store';
import { setDropdownOpen } from 'src/store/shell/actions';
import { setDarkMode } from 'src/store/global/actions';
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

    @property({ type: Boolean })
    darkMode;

    stateChanged(state) {
        this.dropdownOpen = state.shell.dropdownOpen;
        this.navMenus = state.shell.navMenus;
        this.user = state.global.user;
        this.selectedPage = state.global.selectedPage;
        this.darkMode = state.global.darkMode;
    }

    toggleDropdown(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.dropdownOpen) {
            store.dispatch(setDropdownOpen(false));
        } else {
            store.dispatch(setDropdownOpen(true));
        }
    }

    toggleDarkMode() {
        if (this.darkMode) {
            store.dispatch(setDarkMode(false));
        } else {
            store.dispatch(setDarkMode(true));
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
                            class="toggle-dark-mode-desktop"
                            @click=${this.toggleDarkMode}
                            aria-label="toggle to ${this.darkMode ? 'light' : 'dark'} mode"
                        >
                            ${this.darkMode ? html`<i class="fas fa-sun"></i>` : html`<i class="fas fa-moon"></i>`}
                        </button>
                    </li>

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
