import { html, customElement } from 'lit-element';
import BaseShell from '../../base-shell';
import './user-dropdown.scss';

@customElement('user-dropdown')
export default class UserDropdown extends BaseShell {
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

    closeOnOutsideClick(event) {
        if (!this.contains(event.target)) {
            this.closeDropdown();
        }
    }

    render() {
        const {
            firstname, lastname, email, photo,
        } = this.user;

        return html`
            <div class="user-dropdown ${this.dropdownOpen ? 'open' : ''}">
                <div class="user-dropdown__info">
                    <img 
                        src=${photo} 
                        alt="profile picture" 
                        class="user-dropdown__photo"
                        tabindex="0"
                        crossorigin="anonymous"
                    >
                    <span class="user-dropdown__name" tabindex="0">
                        ${`${firstname} ${lastname}`}
                    </span>
                    <span class="user-dropdown__email" tabindex="0">${email}</span>
                </div>
                <ul>
                    ${this.accountMenus.map((item) => html`
                    <li class="user-dropdown__item">
                        <a href=${item.link} target=${item.newtab ? '_blank' : '_self'} class="user-dropdown__link" @click=${this.closeDropdown}>
                            <i class=${item.icon}></i>
                            <span>${item.name}</span>
                        </a>
                    </li>
                    `)}
                </ul>
                <button
                    @click=${this.closeDropdown} 
                    class="aria-close-popup-btn"
                    aria-haspopup="true" 
                    aria-expanded="${this.dropdownOpen ? 'true' : 'false'}"
                >
                    Close ${firstname} ${lastname} Profile
                </button>
            </div>
        `;
    }
}
