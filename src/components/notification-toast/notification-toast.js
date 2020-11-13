import {
    LitElement, html, customElement, property,
} from 'lit-element';
import './notification-toast.scss';

const TOAST_TIMEOUT_IN_MS = 3000;

@customElement('notification-toast')
export default class NotificationToast extends LitElement {
    @property({ type: Object })
    content;

    @property({ type: Boolean })
    show = true;

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

    createRenderRoot() {
        return this;
    }
}
