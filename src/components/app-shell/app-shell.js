import {
    LitElement, html, customElement, property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import store from 'src/store';
import { setDrawerOpen, setDropdownOpen } from 'src/store/shell/actions';
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
        this.logoName = state.shell.logoName;
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

    render() {
        return html`
        <div class="wrapper ${this.drawerOpen || this.dropdownOpen || !this.positionTop ? 'open' : ''}">
            <a href="#!" aria-label="app-logo" class="app-logo">${this.logoName}</a>
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
