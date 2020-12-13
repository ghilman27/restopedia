import { html } from 'lit-element';
import BaseShell from '../base-shell';
import './user-dropdown/user-dropdown';
import './nav-bar.scss';
import './nav-bar_responsive.scss';

export default class NavBar extends BaseShell {
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
                            <picture>
                                <source 
                                    type="image/webp"
                                    src=${this.user.photo}
                                    srcset="${this.user.photoLarge}.webp 480w, ${this.user.photoLarge}.webp 800w"
                                    sizes="(max-width: 600px) 480px, 800px"
                                >
                                <source 
                                    type="image/jpeg"
                                    src=${this.user.photo} 
                                    srcset="${this.user.photoSmall}.jpg 480w, ${this.user.photoLarge}.jpg 800w"
                                    sizes="(max-width: 600px) 480px, 800px"
                                >
                                <img 
                                    @click=${this.toggleDropdown} 
                                    src=${this.user.photo} 
                                    srcset="${this.user.photoSmall}.jpg 480w, ${this.user.photoLarge}.jpg 800w"
                                    sizes="(max-width: 600px) 480px, 800px"
                                    alt="${this.user.firstname} ${this.user.lastname} profile" 
                                    class="nav-desktop__photo"
                                    crossorigin="anonymous"
                                >
                            </picture>
                        </button>
                        <user-dropdown></user-dropdown>
                    </li>
                </ul>
            </nav>
        `;
    }
}

customElements.define('nav-bar', NavBar);
