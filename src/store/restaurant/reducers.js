import { SAVE_RESTAURANT, DELETE_RESTAURANT, SET_INITIAL_STATE } from './types';

const initialState = {};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case SAVE_RESTAURANT:
            return {
                ...state,
                [payload.id]: payload,
            };
        case DELETE_RESTAURANT:
            delete state[payload];
            return state;
        case SET_INITIAL_STATE:
            return {
                ...state,
                ...payload,
            }
        default:
            return state;
    }
}