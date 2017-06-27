/**
 * Loginpage selectors
 */

import {createSelector} from 'reselect';

const selectLogin = (state) => state.get('login');

/**
 * Select credentials
 * @return {{email: string, password: string}}
 */
const makeSelectCredentials = () => createSelector(
    selectLogin,
    (loginState) => ({
        email: loginState.getIn(['credentials', 'email']),
        password: loginState.getIn(['credentials', 'password'])
    })
);

/**
 * Select user email
 * @return {String}
 */
const makeSelectEmail = () => createSelector(
    selectLogin,
    (loginState) => loginState.getIn(['credentials', 'email'])
);

/**
 * Select user password
 * @return {String}
 */
const makeSelectPassword = () => createSelector(
    selectLogin,
    (loginState) => loginState.getIn(['credentials', 'password'])
);

export {
    selectLogin,
    makeSelectCredentials,
    makeSelectEmail,
    makeSelectPassword,
};
