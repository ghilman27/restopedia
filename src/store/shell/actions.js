import { SET_DRAWER_OPEN, SET_DROPDOWN_OPEN, SET_SELECTED_PAGE } from './types';

const createAction = (actionType) => (payload) => (dispatch) => {
    dispatch({
        type: actionType,
        payload,
    });
};

export const setDrawerOpen = createAction(SET_DRAWER_OPEN);
export const setDropdownOpen = createAction(SET_DROPDOWN_OPEN);
export const setSelectedPage = createAction(SET_SELECTED_PAGE);
