import { SAVE_RESTAURANT, DELETE_RESTAURANT, SET_INITIAL_STATE } from './types';

const initialState = {};

export default (state = initialState, action) => {
    const { type, payload } = action;
    const restaurants = { ...state };

    switch (type) {
    case SAVE_RESTAURANT:
        return {
            ...state,
            [payload.id]: { ...payload, saved: true },
        };
    case DELETE_RESTAURANT:
        delete restaurants[payload];
        return restaurants;
    case SET_INITIAL_STATE:
        return payload;
    default:
        return state;
    }
};
