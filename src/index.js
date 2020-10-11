import 'regenerator-runtime'; /* for async await transpile */
import './app';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    const app = document.createElement('main-app');
    body.appendChild(app);
})