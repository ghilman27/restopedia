import { LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import store from '../store';

export default class BaseComponent extends connect(store)(LitElement) {
    async dispatchAction(action) {
        await store.dispatch(action);
        return this;
    }

    createRenderRoot() {
        return this;
    }
}
