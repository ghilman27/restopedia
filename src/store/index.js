import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import restaurantReducers from './restaurant/reducers';
import shellReducers from './shell/reducers';
import globalReducers from './global/reducers';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';

const LOCAL_STORAGE_WRITE_INTERVAL_IN_MS = 1000;
const persistedState = loadFromLocalStorage();

const rootReducers = combineReducers({
    restaurant: restaurantReducers,
    shell: shellReducers,
    global: globalReducers,
});

const store = createStore(
    rootReducers,
    persistedState,
    composeWithDevTools(applyMiddleware(thunk)),
);

store.subscribe(throttle(() => {
    saveToLocalStorage(store.getState());
}, LOCAL_STORAGE_WRITE_INTERVAL_IN_MS));

export default store;
