/* eslint-disable consistent-return */
export default async () => {
    try {
        const registration = await navigator.serviceWorker
            .register('worker.js');
        /* eslint-disable no-console */
        console.log('Service worker registration success');
        /* eslint-enable no-console */
        return registration;
    } catch (err) {
        /* eslint-disable no-console */
        console.error('Service worker registration fail. ', err);
        /* eslint-enable no-console */
    }
};
