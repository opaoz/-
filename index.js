import React from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import _isEmpty from 'lodash/isEmpty';
import {Button} from 'react-toolbox';

import AtPrefix from 'containers/HomePage/AtPrefix';
import CenteredSection from 'containers/HomePage/CenteredSection';
import Form from 'containers/HomePage/Form';
import Input from 'containers/HomePage/Input';
import Section from 'containers/HomePage/Section';
import {login, changeCredentials} from './actions';
import {makeSelectCredentials, makeSelectEmail, makeSelectPassword} from './selectors';

/**
 * Login page main class
 */
export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    // todo: return email when be ready on BE
    /**
     * Render function
     * @returns {XML}
     */
    render() {
        return (
            <article>
                <Helmet
                    title="Home Page"
                    meta={[
                        {name: 'description', content: 'A React.js Boilerplate application homepage'},
                    ]}
                />
                <div>
                    <CenteredSection>
                        <h2>
                            Please, log in
                        </h2>
                    </CenteredSection>
                    <Section>
                        <Form onSubmit={this.props.onSubmitForm} data-qa="login-form" novalidation>
                            <label htmlFor="login">
                                <AtPrefix>
                                    Email:
                                </AtPrefix>
                                <Input
                                    data-qa="input-email"
                                    id="email"
                                    type="text"
                                    placeholder="mxstbr"
                                    value={this.props.email}
                                    onChange={this.props.onChangeEmail}
                                />
                            </label> <br/>
                            <label htmlFor="password">
                                <AtPrefix>
                                    Password:
                                </AtPrefix>
                                <Input
                                    data-qa="input-password"
                                    id="password"
                                    type="password"
                                    value={this.props.password}
                                    onChange={this.props.onChangePassword}
                                />
                            </label><br/><br/>
                            <Button data-qa="button-login" icon="bookmark" label="Login" raised primary type="submit"/>
                        </Form>
                    </Section>
                </div>
            </article>
        );
    }
}

LoginPage.propTypes = {
    onSubmitForm: React.PropTypes.func,
    email: React.PropTypes.string,
    password: React.PropTypes.string,
    onChangeEmail: React.PropTypes.func,
    onChangePassword: React.PropTypes.func,
};

/**
 * Connect with `Redux` using props
 * @param {Function} dispatch
 * @returns {{onChangeEmail: (function(*)), onChangePassword: (function(*)), onSubmitForm: (function(*))}}
 */
export function mapDispatchToProps(dispatch) {
    return {
        /**
         * Email input change handler
         * @param {Object} evt event object
         */
        onChangeEmail: (evt) => {
            dispatch(changeCredentials(['email', evt.target.value]));
        },
        /**
         * Password input change handler
         * @param {Object} evt event object
         */
        onChangePassword: (evt) => {
            dispatch(changeCredentials(['password', evt.target.value]));
        },
        /**
         * Form submit handler
         * @param {Object} evt event object
         */
        onSubmitForm: (evt) => {
            evt.preventDefault();

            if (!_isEmpty(makeSelectCredentials())) {
                dispatch(login());
            }
        },
    };
}

const mapStateToProps = createStructuredSelector({
    login: makeSelectEmail(),
    password: makeSelectPassword()
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
