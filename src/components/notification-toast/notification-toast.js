import { html } from 'lit-element';
import './notification-toast.scss';
import BaseComponent from '../../global/BaseComponent';

const TOAST_TIMEOUT_IN_MS = 3000;

export default class NotificationToast extends BaseComponent {
    static get properties() {
        return {
            content: { type: Object },
            show: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.show = true;
    }

    connectedCallback() {
        super.connectedCallback();
        setTimeout(() => this.removeToast(), TOAST_TIMEOUT_IN_MS);
    }

    removeToast() {
        this.remove();
    }

    render() {
        const { name, message } = this.content;
        return html`
            <div class="container">
                ${name ? html`<span class="name">${name}</span>` : ''}
                ${message ? html`<span class="message">${message}</span>` : ''}
            </div>
        `;
    }
}

customElements.define('notification-toast', NotificationToast);
