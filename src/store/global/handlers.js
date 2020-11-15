import {
    SET_SELECTED_PAGE, SET_DARK_MODE,
} from './types';

const changeState = (stateName) => (state, action) => ({
    ...state,
    [stateName]: action.payload,
});

export default {
    [SET_SELECTED_PAGE]: changeState('selectedPage'),
    [SET_DARK_MODE]: changeState('darkMode'),
};
