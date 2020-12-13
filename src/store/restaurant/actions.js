import RestaurantDB from '../../data/db';
import { IdbWriteError, IdbGetError } from '../../utils/errors';
import { SAVE_RESTAURANT, DELETE_RESTAURANT, SET_INITIAL_STATE } from './types';

export const saveRestaurant = (restaurant) => async (dispatch) => {
    try {
        await RestaurantDB.saveRestaurant(restaurant);
        dispatch({
            type: SAVE_RESTAURANT,
            payload: restaurant,
        });
    } catch (error) {
        throw new IdbWriteError(error);
    }
};

export const deleteRestaurant = (restaurantId) => async (dispatch) => {
    try {
        await RestaurantDB.deleteRestaurant(restaurantId);
        dispatch({
            type: DELETE_RESTAURANT,
            payload: restaurantId,
        });
    } catch (error) {
        throw new IdbWriteError(error);
    }
};

export const setSavedRestaurants = () => async (dispatch, getState) => {
    const currentState = getState().restaurant;
    if (Object.keys(currentState).length > 0) {
        return;
    }

    try {
        const restaurants = await RestaurantDB.getRestaurants();
        let savedRestaurants;
        if (restaurants.length) {
            savedRestaurants = Object.assign(
                ...restaurants.map((restaurant) => ({
                    [restaurant.id]: restaurant,
                })),
            );
            dispatch({
                type: SET_INITIAL_STATE,
                payload: savedRestaurants,
            });
        }
    } catch (error) {
        /* eslint-disable no-console */
        console.log(error);
        /* eslint-enable no-console */
        throw new IdbGetError(error);
    }
};

export const resetRestaurants = () => async (dispatch) => {
    dispatch({
        type: SET_INITIAL_STATE,
        payload: {},
    });
};
