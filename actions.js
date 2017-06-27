import _ from 'lodash';

import {
    CHANGE_CREDENTIALS
} from './constants';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
} from '../App/constants';

/**
 * Start login request using Sara
 * @returns {{type: string}}
 */
export function login() {
    return {
        type: LOGIN_REQUEST
    };
}

/**
 * If login success, send data to state
 * @param {Object} data result data
 * @param {String} email email of user to login
 * @returns {{type: string, email:string, userId: string, permissions, token: string, meta: {transition: (function(): {pathname: string})}}}
 */
export function loginSuccess(data, email) {
    /* istanbul ignore if */
    if (!_.isEmpty(data.data)) {
        data = data.data;
    }

    /* istanbul ignore next */
    return {
        type: LOGIN_SUCCESS,
        email,
        name: data.user.name,
        userId: data.user._id || 'uniqueid',
        permissions: data.user.permissions,
        token: data.token,
        meta: {
            transition: () => ({
                pathname: '/login',
            })
        }
    };
}

/**
 * Change credentials inputs on login page
 * @param {Array} credentials
 * @returns {{type, credentials: array}}
 */
export function changeCredentials(credentials) {
    return {
        type: CHANGE_CREDENTIALS,
        credentials
    };
}
