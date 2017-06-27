/**
 * Login user
 */

import {take, call, put, select, cancel, takeEvery} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';

import {BASEURL, LOGIN_REQUEST} from '../../containers/App/constants';
import request from '../../utils/request';
import {loginSuccess} from './actions';
import {makeSelectCredentials} from './selectors';
import {error} from '../App/actions';

let called = false; // I hate this fucking routes, which recall same functions couple time

/**
 * Login requester
 * @see <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/function*">generator function</a>
 */
export function* login() {
    const requestURL = `${BASEURL}/login`;
    const credentials = yield select(makeSelectCredentials());
    /* istanbul ignore if */
    if (called) {
        return;
    }
    called = true;

    try {
        const req = yield call(request, requestURL, {
            method: 'POST',
            body: {
                email: credentials.email,
                password: credentials.password
            }
        });
        called = false;
        yield put(loginSuccess(req, credentials.email));
    } catch (err) {
        called = false;
        yield put(error(err));
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* loginAtBE() {
    const watcher = yield takeEvery(LOGIN_REQUEST, login);

    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export default [
    loginAtBE
];
