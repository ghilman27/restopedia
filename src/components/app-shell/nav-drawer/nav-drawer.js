import {
    LitElement, html, customElement, property,
} from 'lit-element';
import { connect } from 'pwa-helpers';
import store from 'src/store';
import { setDrawerOpen } from 'src/store/shell/actions';
import './nav-drawer.scss';

@customElement('nav-drawer')
export default class NavDrawer extends connect(store)(LitElement) {
    @property({ type: Boolean })
    drawerOpen;

    @property({ type: Object })
    user;

    @property({ type: Array })
    navMenus;

    @property({ type: Array })
    accountMenus;

    @property({ type: String })
    selectedPage;

    constructor() {
        super();
        this.closeOnOutsideClick = this.closeOnOutsideClick.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this.closeOnOutsideClick);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this.closeOnOutsideClick);
    }

    stateChanged(state) {
        this.drawerOpen = state.shell.drawerOpen;
        this.navMenus = state.shell.navMenus;
        this.accountMenus = state.shell.accountMenus;
        this.user = state.global.user;
        this.selectedPage = state.global.selectedPage;
    }

    closeOnOutsideClick(event) {
        if (!this.contains(event.target)) {
            this.closeDrawer();
        }
    }

    closeDrawer = () => {
        store.dispatch(setDrawerOpen(false));
    }

    toggleDrawer() {
        if (this.drawerOpen) {
            store.dispatch(setDrawerOpen(false));
        } else {
            store.dispatch(setDrawerOpen(true));
        }
    }

    render() {
        return html`
            <nav class="nav-drawer-mobile ${this.drawerOpen ? 'open' : ''}">
                <div class="user-view">
                    <img 
                        src=${this.user.photo} 
                        alt="profile picture" 
                        class="user-view__photo" 
                        tabindex="0" 
                        crossorigin="anonymous"
                    />
                    <span class="user-view__name" tabindex="0">${`${this.user.firstname} ${this.user.lastname}`}
                    </span>
                    <span class="user-view__email" tabindex="0">${this.user.email}</span>
                </div>
                <ul class="nav-mobile">
                    ${this.navMenus.map((item) => html`
                    <li class="nav-mobile__item ${this.selectedPage === item.name ? 'selected' : ''}">
                        <a href=${item.link} target=${item.newtab ? '_blank' : '_self'} class="nav-mobile__link" @click=${this.closeDrawer}>
                            <i class="${item.icon}"></i>
                            <span>${item.name}</span>
                        </a>
                    </li>
                    `)}
                    <hr class="divider">
                    ${this.accountMenus.map((item) => html`
                    <li class="nav-mobile__item">
                        <a href=${item.link} target=${item.newtab ? '_blank' : '_self'} class="nav-mobile__link" @click=${this.closeDrawer}>
                            <i class=${item.icon}></i>
                            <span>${item.name}</span>
                        </a>
                    </li>
                    `)}
                </ul>
                <button
                    @click=${this.toggleDrawer} 
                    class="aria-close-popup-btn"
                    aria-haspopup="true" 
                    aria-expanded=${this.drawerOpen ? 'true' : 'false'}
                >
                    Close Navigation Drawer
                </button>
            </nav>
        `;
    }

    createRenderRoot() { return this; }
}
