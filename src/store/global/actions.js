import {
    SET_SELECTED_PAGE, SET_DARK_MODE,
} from './types';

const createAction = (actionType) => (payload) => (dispatch) => {
    dispatch({
        type: actionType,
        payload,
    });
};

export const setSelectedPage = createAction(SET_SELECTED_PAGE);
export const setDarkMode = createAction(SET_DARK_MODE);
