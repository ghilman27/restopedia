import 'regenerator-runtime';
import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

skipWaiting();
clientsClaim();

registerRoute(
	({ url }) => url.origin === process.env.API_BASE_URL,
	new StaleWhileRevalidate({
		cacheName: process.env.CACHE_NAME,
	})
);

registerRoute(
	({ url }) => url.origin === process.env.GOOGLE_FONTS_URL,
	new StaleWhileRevalidate({
		cacheName: process.env.GOOGLE_FONTS_CACHE_NAME,
	})
);

registerRoute(
	({ url }) => url.origin === process.env.GOOGLE_WEBFONTS_URL,
	new CacheFirst({
		cacheName: process.env.GOOGLE_WEBFONTS_CACHE_NAME,
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
			new ExpirationPlugin({
				maxAgeSeconds: 60 * 60 * 24 * 365,
				maxEntries: 30,
			}),
		],
	})
);

// self.addEventListener('push', function (event) {
// 	let body;
// 	if (event.data) {
// 		body = event.data.text();
// 	} else {
// 		body = 'Push message no payload';
// 	}
// 	const options = {
// 		body: body,
// 		icon: 'images/icon192.png',
// 		badge: 'images/icon192.png',
// 		vibrate: [100, 50, 100],
// 		data: {
// 			dateOfArrival: Date.now(),
// 			primaryKey: 1,
// 		},
// 	};
// 	event.waitUntil(
// 		self.registration.showNotification('Push Notification', options)
// 	);
// });

precacheAndRoute(self.__WB_MANIFEST);
