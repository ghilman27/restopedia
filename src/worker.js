/* eslint-disable */
import 'regenerator-runtime';
import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import {
    registerRoute as workboxRegisterRoute,
    NavigationRoute,
} from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

skipWaiting();
clientsClaim();

const DEFAULT_STRATEGY = StaleWhileRevalidate;
const DEFAULT_PLUGINS = [
    new CacheableResponsePlugin({
        statuses: [200],
    }),
];

const registerRoute = ({
    origin,
    name,
    Strategy = DEFAULT_STRATEGY,
    plugins = DEFAULT_PLUGINS,
}) => {
    workboxRegisterRoute(
        ({ url }) => url.origin === origin,
        new Strategy({
            cacheName: name,
            plugins,
        })
    );
};

registerRoute({
    origin: process.env.API_BASE_URL,
    name: process.env.CACHE_NAME,
});

registerRoute({
    origin: process.env.API_IMAGE_BASE_URL,
    name: process.env.IMAGE_CACHE_NAME,
});

registerRoute({
    origin: process.env.GOOGLE_FONTS_URL,
    name: process.env.GOOGLE_FONTS_CACHE_NAME,
});

registerRoute({
    origin: process.env.GOOGLE_WEBFONTS_URL,
    name: process.env.GOOGLE_WEBFONTS_CACHE_NAME,
    Strategy: CacheFirst,
    plugins: [
        ...DEFAULT_PLUGINS,
        new ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
            maxEntries: 30,
        }),
    ],
});

precacheAndRoute(self.__WB_MANIFEST);

const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler);
workboxRegisterRoute(navigationRoute);
