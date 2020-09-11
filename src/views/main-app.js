// import {} from './components';
import data from '../DATA.json';
import { LitElement, html, customElement } from 'lit-element';

@customElement('main-app')
class MainApp extends LitElement {
    constructor() {
        super();
        this._restos = [];
    }

    render() {
        return html`
            <p>Hello World</p>
        `;
    }
}