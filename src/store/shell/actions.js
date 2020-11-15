import {
    SET_DRAWER_OPEN, SET_DROPDOWN_OPEN,
} from './types';

const createAction = (actionType) => (payload) => (dispatch) => {
    dispatch({
        type: actionType,
        payload,
    });
};

export const setDrawerOpen = createAction(SET_DRAWER_OPEN);
export const setDropdownOpen = createAction(SET_DROPDOWN_OPEN);
