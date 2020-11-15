import actionHandlers from './handlers';

const initialShellState = {
    appName: 'restopedia',
    selectedPage: 'home',
    darkMode: false,
    user: {
        firstname: 'Ghilman',
        lastname: 'Al Fatih',
        email: 'ghilman27@gmail.com',
        photo: '/images/profile.jpg',
    },
};

const createReducers = (initialState, handlers) => (state = initialState, action) => {
    const handler = handlers[action.type];
    if (handler) {
        return handler(state, action);
    }
    return state;
};

export default createReducers(initialShellState, actionHandlers);
