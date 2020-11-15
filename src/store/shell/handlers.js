import {
    SET_DRAWER_OPEN, SET_DROPDOWN_OPEN,
} from './types';

const changeState = (stateName) => (state, action) => ({
    ...state,
    [stateName]: action.payload,
});

export default {
    [SET_DRAWER_OPEN]: changeState('drawerOpen'),
    [SET_DROPDOWN_OPEN]: changeState('dropdownOpen'),
};
