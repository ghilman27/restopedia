export default async () => {
	try {
        const registration = await navigator.serviceWorker
            .register('worker.js');
        console.log('Service worker registration success');
        return registration;
    } catch (err) {
        console.error('Service worker registration fail. ', err);
    }
}