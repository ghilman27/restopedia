export const loadFromLocalStorage = () => {
    try {
        const serializedRestaurant = localStorage.getItem('restaurant');
        if (serializedRestaurant === null) return undefined;
        const restaurant = JSON.parse(serializedRestaurant);
        return { restaurant };
    } catch (err) {
        /* eslint-disable no-console */
        console.log(err);
        return undefined;
    }
};

export const saveToLocalStorage = (state) => {
    try {
        const serializedRestaurant = JSON.stringify(state.restaurant);
        localStorage.setItem('restaurant', serializedRestaurant);
    } catch (err) {
        console.log(err);
        /* eslint-enable no-console */
    }
};
