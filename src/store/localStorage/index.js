export const loadFromLocalStorage = () => {
    try {
        const serializedRestaurant = localStorage.getItem('restaurant');
        const serializedGlobal = localStorage.getItem('global');
        const restaurant = serializedRestaurant ? JSON.parse(serializedRestaurant) : undefined;
        const global = serializedGlobal ? JSON.parse(serializedGlobal) : undefined;
        return { restaurant, global };
    } catch (err) {
        /* eslint-disable no-console */
        console.log(err);
        return undefined;
    }
};

export const saveToLocalStorage = (state) => {
    try {
        const serializedRestaurant = JSON.stringify(state.restaurant);
        const serializedGlobal = JSON.stringify(state.global);
        localStorage.setItem('restaurant', serializedRestaurant);
        localStorage.setItem('global', serializedGlobal);
    } catch (err) {
        console.log(err);
        /* eslint-enable no-console */
    }
};
