import actionHandlers from './handlers';

const initialShellState = {
    drawerOpen: false,
    dropdownOpen: false,
    logoName: 'restopedia',
    user: {
        firstname: 'Ghilman',
        lastname: 'Al Fatih',
        email: 'ghilman27@gmail.com',
        photo: '/images/profile.jpg',
    },
    navMenus: [
        {
            name: 'home',
            link: '/',
            icon: 'fa fa-home',
        },
        {
            name: 'favorites',
            link: '/favorites',
            icon: 'fa fa-heart',
        },
        {
            name: 'about us',
            link: 'https://github.com/ghilman27',
            newtab: true,
            icon: 'fab fa-github',
        },
    ],
    accountMenus: [
        {
            name: 'settings',
            link: '/settings',
            icon: 'fa fa-cog',
        },
        {
            name: 'sign out',
            link: '/signout',
            icon: 'fas fa-sign-out-alt',
        },
    ],
    selectedPage: 'home',
};

const createReducers = (initialState, handlers) => (state = initialState, action) => {
    const handler = handlers[action.type];
    if (handler) {
        return handler(state, action);
    }
    return state;
};

export default createReducers(initialShellState, actionHandlers);
