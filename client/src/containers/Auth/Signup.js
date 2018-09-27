import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions';
import SignupForm from './SignupForm';

class Signup extends Component {

    componentWillUnmount() {
        if (this.props.errorMessage) {
            this.props.authError(null);
        }
    }

    handleSubmit({email, password, passwordConfirmation}) {
        this.props.signupUser({email, password, passwordConfirmation});
    }
    
    getRedirectPath() {
        const locationState = this.props.location.state
        if (locationState && locationState.from.pathname) {
            return locationState.from.pathname
        } else {
            return '/'
        }
    }

    render() {
        return (this.props.authenticated)
            ? 
                <Redirect to={{
                    pathname: this.getRedirectPath(), 
                    state: {
                        from: this.props.location
                    }
                }} />
            :
                <div>
                    <h1>Signup</h1>
                    <SignupForm onSubmit={this.handleSubmit.bind(this)} errorMessage={this.props.errorMessage} />
                </div>
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        errorMessage: state.auth.error
    }
}

export default connect(mapStateToProps, actions)(Signup);