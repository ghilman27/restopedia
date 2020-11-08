import { SAVE_RESTAURANT, DELETE_RESTAURANT, SET_INITIAL_STATE } from './types';
import RestaurantDB from 'src/data/db';
import _ from 'lodash';
import { IdbWriteError, IdbGetError } from 'src/utils/errors';

export const saveRestaurant = (restaurant) => {
	return async (dispatch) => {
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
};

export const deleteRestaurant = (restaurantId) => {
	return async (dispatch) => {
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
};

export const setSavedRestaurants = () => {
	return async (dispatch, getState) => {
		const currentState = getState().restaurant;
		try {
			if (_.isEmpty(currentState)) {
				const restaurants = await RestaurantDB.getRestaurants();
				let savedRestaurants;
				if (restaurants.length) {
					savedRestaurants = Object.assign(
						...restaurants.map((restaurant) => ({
							[restaurant.id]: restaurant,
						}))
					);
				}
				dispatch({
					type: SET_INITIAL_STATE,
					payload: savedRestaurants,
				});
			}
		} catch (error) {
			console.log(error);
			throw new IdbGetError(error);
		}
	};
};
