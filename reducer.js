import {fromJS} from 'immutable';

import {
    CHANGE_CREDENTIALS
} from './constants';

// The initial state of the App
const initialState = fromJS({
    credentials: {
        password: '',
        email: ''
    },
});

/**
 * Login page reducer
 * @param {Object} state current app state
 * @param {Object} action dispatched event
 * @return {Object} new state object
 */
function loginReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CREDENTIALS:
            return state
                .setIn(['credentials', action.credentials[0]], action.credentials[1]);
        default:
            return state;
    }
}

export default loginReducer;
