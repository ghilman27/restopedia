import { html, customElement, property } from 'lit-element';
import BaseShell from './base-shell';
import './nav-bar/nav-bar';
import './nav-drawer/nav-drawer';
import './app-shell.scss';
import './app-shell_responsive.scss';

@customElement('app-shell')
export default class AppShell extends BaseShell {
    @property({ type: Boolean })
    positionTop = true;

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('scroll', this.handleScroll);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('scroll', this.handleScroll);
    }

    stateChanged(state) {
        super.stateChanged(state);
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

    handleScroll = () => {
        this.positionTop = !window.pageYOffset;
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
}
