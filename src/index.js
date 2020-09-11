import 'regenerator-runtime'; /* for async await transpile */
import './views/main-app';

window.addEventListener('load', () => {
    const root = document.getElementById('root');
    const mainApp = document.createElement('main-app');

    root.appendChild(mainApp);
})
