import 'regenerator-runtime'; /* for async await transpile */
import store from './store';
import { setSavedRestaurants } from './store/restaurant/actions';
import initRoutes from './routes';
import registerServiceWorker from './utils/sw-register';
import './styles/app.scss';
import './components';
import './views';

document.addEventListener('DOMContentLoaded', () => {
    store.dispatch(setSavedRestaurants());
    initRoutes();

    if (!('serviceWorker' in navigator)) {
        console.log('Service worker is not supported');
    } else {
        registerServiceWorker();
        // requestPermission();
    }
})