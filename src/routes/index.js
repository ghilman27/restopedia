import { Router } from '@vaadin/router';

export default () => {
    const content = document.querySelector('main');
    const router = new Router(content);
    router.setRoutes([
        {
            path: '/',
            component: 'home-view',
        },
        {
            path: '/restaurant/:id',
            component: 'detail-view',
        },
        {
            path: '/favorites',
            component: 'favorite-view',
        },
        {
            path: '(.*)',
            component: 'notfound-view',
        },
    ]);
};
