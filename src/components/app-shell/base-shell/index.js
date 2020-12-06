import { setDrawerOpen, setDropdownOpen } from '../../../store/shell/actions';
import { setDarkMode } from '../../../store/global/actions';
import BaseComponent from '../../../global/BaseComponent';

export default class BaseShell extends BaseComponent {
    static get properties() {
        return {
            drawerOpen: { type: Boolean },
            dropdownOpen: { type: Boolean },
            navMenus: { type: Array },
            accountMenus: { type: Array },
            selectedPage: { type: String },
            darkMode: { type: Boolean },
            user: { type: Object },
            logoName: { type: String },
        };
    }

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
            this.dispatchAction(setDropdownOpen(false));
        } else {
            this.dispatchAction(setDropdownOpen(true));
        }
    }

    toggleDrawer(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.drawerOpen) {
            this.dispatchAction(setDrawerOpen(false));
        } else {
            this.dispatchAction(setDrawerOpen(true));
        }
    }

    closeDrawer() {
        this.dispatchAction(setDrawerOpen(false));
    }

    closeDropdown() {
        this.dispatchAction(setDropdownOpen(false));
    }

    toggleDarkMode() {
        if (this.darkMode) {
            this.dispatchAction(setDarkMode(false));
        } else {
            this.dispatchAction(setDarkMode(true));
        }
    }
}
