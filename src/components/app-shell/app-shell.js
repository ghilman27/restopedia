import {
    LitElement, html, customElement, property,
} from 'lit-element';
import './app-shell.scss';
import './app-shell_responsive.scss';

@customElement('app-shell')
export default class AppShell extends LitElement {
    @property({ type: Boolean })
    drawerOpen = false;

    @property({ type: Boolean })
    dropdownOpen = false;

    @property({ type: Boolean })
    positionTop = true;

    @property({ type: String })
    logoName = 'restopedia';

    @property({ type: Object })
    user = {
        firstname: 'Ghilman',
        lastname: 'Al Fatih',
        email: 'ghilman27@gmail.com',
        photo: '/images/profile.jpg',
    }

    @property({ type: Array })
    navMenus = [
        {
            name: 'home',
            link: '/',
            icon: 'fa fa-home',
        },
        {
            name: 'favourite',
            link: '/favorites',
            icon: 'fa fa-heart',
        },
        {
            name: 'about us',
            link: 'https://github.com/ghilman27',
            newtab: true,
            icon: 'fab fa-github',
        },
    ];

    @property({ type: Array })
    accountMenus = [
        {
            name: 'settings',
            link: '#!',
            icon: 'fa fa-cog',
        },
        {
            name: 'sign out',
            link: '#!',
            icon: 'fas fa-sign-out-alt',
        },
    ]

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);
    }

    disconnectedCallback() {
        document.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.dropdownOpen = false;
        this.drawerOpen = false;
    }

    handleScroll = () => {
        this.positionTop = !window.pageYOffset;
    }

    toggleDrawer() {
        this.drawerOpen = !this.drawerOpen;
    }

    toggleDropdown(e) {
        e.preventDefault();
        e.stopPropagation();
        this.dropdownOpen = !this.dropdownOpen;
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

            <nav class="nav-drawer-desktop">
                <ul class="nav-desktop">
                    ${this.navMenus.map((item) => html`
                    <li class="nav-desktop__item">
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

                        <div id="user-dropdown" class="user-dropdown ${this.dropdownOpen ? 'open' : ''}">
                            <div class="user-dropdown__info">
                                <img 
                                    src=${this.user.photo} 
                                    alt="profile picture" 
                                    class="user-dropdown__photo"
                                    tabindex="0"
                                    crossorigin="anonymous"
                                >
                                <span class="user-dropdown__name" tabindex="0">
                                    ${`${this.user.firstname} ${this.user.lastname}`}
                                </span>
                                <span class="user-dropdown__email" tabindex="0">${this.user.email}</span>
                            </div>
                            <ul>
                                ${this.accountMenus.map((item) => html`
                                <li class="user-dropdown__item">
                                    <a href=${item.link} target=${item.newtab ? '_blank' : '_self'} class="user-dropdown__link">
                                        <i class=${item.icon}></i>
                                        <span>${item.name}</span>
                                    </a>
                                </li>
                                `)}
                            </ul>
                            <button
                                @click=${this.toggleDropdown} 
                                class="aria-close-popup-btn"
                                aria-haspopup="true" 
                                aria-expanded="${this.dropdownOpen ? 'true' : 'false'}"
                            >
                                Close ${this.user.firstname} ${this.user.lastname} Profile
                            </button>
                        </div>
                    </li>
                </ul>
            </nav>

            <nav class="nav-drawer-mobile ${this.drawerOpen ? 'open' : ''}">
                <div class="user-view">
                    <img src=${this.user.photo} alt="profile picture" class="user-view__photo" tabindex="0" crossorigin="anonymous">
                    <span class="user-view__name" tabindex="0">${`${this.user.firstname} ${this.user.lastname}`}</span>
                    <span class="user-view__email" tabindex="0">${this.user.email}</span>
                </div>
                <ul class="nav-mobile">
                    ${this.navMenus.map((item) => html`
                    <li class="nav-mobile__item">
                        <a href=${item.link} target=${item.newtab ? '_blank' : '_self'} class="nav-mobile__link">
                            <i class="${item.icon}"></i>
                            <span>${item.name}</span>
                        </a>
                    </li>
                    `)}

                    <hr class="divider">

                    ${this.accountMenus.map((item) => html`
                    <li class="nav-mobile__item">
                        <a href=${item.link} target=${item.newtab ? '_blank' : '_self'} class="nav-mobile__link">
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
        </div>
        `;
    }

    createRenderRoot() { return this; }
}
