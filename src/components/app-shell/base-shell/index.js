import { LitElement, property } from 'lit-element';
import { connect } from 'pwa-helpers';
import store from 'src/store';
import { setDrawerOpen, setDropdownOpen } from 'src/store/shell/actions';
import { setDarkMode } from 'src/store/global/actions';

export default class BaseShell extends connect(store)(LitElement) {
    @property({ type: Boolean })
    drawerOpen;

    @property({ type: Boolean })
    dropdownOpen;

    @property({ type: Array })
    navMenus;

    @property({ type: Array })
    accountMenus;

    @property({ type: String })
    selectedPage;

    @property({ type: Boolean })
    darkMode;

    @property({ type: Object })
    user;

    @property({ type: String })
    logoName;

    stateChanged(state) {
        this.drawerOpen = state.shell.drawerOpen;
        this.dropdownOpen = state.shell.dropdownOpen;
        this.navMenus = state.shell.navMenus;
        this.accountMenus = state.shell.accountMenus;
        this.selectedPage = state.global.selectedPage;
        this.darkMode = state.global.darkMode;
        this.user = state.global.user;
        this.logoName = state.global.appName;
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

    toggleDrawer = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.drawerOpen) {
            store.dispatch(setDrawerOpen(false));
        } else {
            store.dispatch(setDrawerOpen(true));
        }
    }

    closeDrawer = () => {
        store.dispatch(setDrawerOpen(false));
    }

    closeDropdown = () => {
        store.dispatch(setDropdownOpen(false));
    }

    toggleDarkMode() {
        if (this.darkMode) {
            store.dispatch(setDarkMode(false));
        } else {
            store.dispatch(setDarkMode(true));
        }
    }

    createRenderRoot() {
        return this;
    }
}
