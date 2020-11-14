import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import restaurantReducers from './restaurant/reducers';
import shellReducers from './shell/reducers';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';

const persistedState = loadFromLocalStorage();

const rootReducers = combineReducers({
    restaurant: restaurantReducers,
    shell: shellReducers,
});

const store = createStore(
    rootReducers,
    persistedState,
    composeWithDevTools(applyMiddleware(thunk)),
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
