import {
    LitElement, html, customElement, property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import store from 'src/store';
import { setDrawerOpen, setDropdownOpen } from 'src/store/shell/actions';
import { setDarkMode } from 'src/store/global/actions';
import './nav-bar/nav-bar';
import './nav-drawer/nav-drawer';
import './app-shell.scss';
import './app-shell_responsive.scss';

@customElement('app-shell')
export default class AppShell extends connect(store)(LitElement) {
    @property({ type: Boolean })
    drawerOpen;

    @property({ type: Boolean })
    dropdownOpen;

    @property({ type: Boolean })
    positionTop = true;

    @property({ type: String })
    logoName;

    @property({ type: Boolean })
    darkMode;

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }

    stateChanged(state) {
        this.drawerOpen = state.shell.drawerOpen;
        this.dropdownOpen = state.shell.dropdownOpen;
        this.logoName = state.global.appName;
        this.darkMode = state.global.darkMode;

        this.decideDarkMode();
    }

    decideDarkMode() {
        const body = document.querySelector('body');
        if (this.darkMode) {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
    }

    handleResize = () => {
        store.dispatch(setDrawerOpen(false));
        store.dispatch(setDropdownOpen(false));
    }

    handleScroll = () => {
        this.positionTop = !window.pageYOffset;
    }

    toggleDrawer = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.drawerOpen) {
            store.dispatch(setDrawerOpen(false));
        } else {
            store.dispatch(setDrawerOpen(true));
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
        <div class="wrapper ${this.drawerOpen || this.dropdownOpen || !this.positionTop ? 'open' : ''}">
            <a href="#!" aria-label="app-logo" class="app-logo">${this.logoName}</a>
            <button 
                class="toggle-dark-mode-mobile"
                @click=${this.toggleDarkMode}
                aria-label="toggle to ${this.darkMode ? 'light' : 'dark'} mode"
            >
                ${this.darkMode ? html`<i class="fas fa-sun"></i>` : html`<i class="fas fa-moon"></i>`}
            </button>
            <button 
                class="menu-btn" 
                @click=${this.toggleDrawer} 
                aria-label="navigation drawer"
                aria-haspopup="true" 
                aria-expanded=${this.drawerOpen ? 'true' : 'false'}
            >
                <span class="menu-btn__burger ${this.drawerOpen ? 'open' : ''}"></span>
            </button>
            <nav-bar></nav-bar>
            <nav-drawer></nav-drawer>
        </div>
        `;
    }

    createRenderRoot() { return this; }
}
