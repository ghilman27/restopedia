import 'regenerator-runtime'; /* for async await transpile */
import './styles/app.scss';
import './views';
import './app';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    const app = document.createElement('main-app');
    body.appendChild(app);
})