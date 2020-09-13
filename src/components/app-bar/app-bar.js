import { LitElement, html, customElement, property} from 'lit-element';
import './app-bar.scss';

@customElement('app-bar')
export default class AppBar extends LitElement {
    @property({type: Boolean})
    drawerOpen = false;

    @property({type: String})
    logoName = 'restopedia';

    @property({type: Object})
    user = {
        name: 'Ghilman Al Fatih',
        email: 'ghilman27@gmail.com',
        photo: '/images/profile.jpg',
    }

    /*
    * MENUS PROPERTIES WILL BE MOVED TO SEPARATE FILE (as input props)
    * IF THE APP BECOME MORE COMPLEX LATER
    * name: the name of navigation item
    * link: navigation link (for future use, still unsure about the implementation)
    * icon: the icon class in font awesome
    *       more detail -> https://fontawesome.com/v4.7.0/icons/
    */
    @property({type: Array})
    navMenus = [
        {
            name: 'home',
            link: '',
            icon: 'fa fa-home',
        },
        {
            name: 'favourite',
            link: '',
            icon: 'fa fa-heart',
        },
        {
            name: 'about us',
            link: '',
            icon: 'fab fa-github',
        },
    ];

    @property({type: Array})
    accountMenus = [
        {
            name: 'settings',
            link: '',
            icon: 'fa fa-cog',
        },
        {
            name: 'sign out',
            link: '',
            icon: 'fas fa-sign-out-alt',
        },
    ]

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        window.pageYOffset || this.drawerOpen
            ? this.classList.add('open')
            : this.classList.remove('open');
    }

    toggleDrawer() {
        if (this.drawerOpen) {
            this.drawerOpen = false;
            if (!window.pageYOffset) this.classList.remove('open');
        } else {
            this.drawerOpen = true;
            this.classList.add('open');
        }
    }

    render() {
        return html`
            <a href="#!" class="app-logo">${this.logoName}</a>
            <button class="menu-btn" @click=${this.toggleDrawer}>
                <span class="menu-btn__burger ${this.drawerOpen ? 'open' : ''}"></span>
            </button>
            <nav class="nav-drawer ${this.drawerOpen ? 'open' : ''}">
                <div class="user-view">
                    <img src=${this.user.photo} alt="user-photo" class="user-view__photo">
                    <h3 class="user-view__name">${this.user.name}</h3>
                    <h4 class="user-view__email">${this.user.email}</h4>
                </div>
                <ul class="nav-menu">
                    ${this.navMenus.map(item => html`
                        <li class="nav-menu__item">
                            <a href="#!" class="nav-menu__link">
                                <i class=${item.icon}></i>
                                <span>${item.name}</span>
                            </a>
                        </li>
                    `)}
                    <hr class="divider">
                    ${this.accountMenus.map(item => html`
                        <li class="nav-menu__item">
                            <a href="#!" class="nav-menu__link">
                                <i class=${item.icon}></i>
                                <span>${item.name}</span>
                            </a>
                        </li>
                    `)}
                </ul>
            </nav>
        `;
    }

    createRenderRoot() {return this};
}