import 'regenerator-runtime'; /* for async await transpile */
import store from './store';
import { setSavedRestaurants } from './store/restaurant/actions';
import initRoutes from 'src/routes';
import './styles/app.scss';
import './components';
import './views';

document.addEventListener('DOMContentLoaded', () => {
    store.dispatch(setSavedRestaurants());
    initRoutes();
})