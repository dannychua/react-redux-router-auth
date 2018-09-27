import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions';
import SigninForm from './SigninForm';

class Signin extends Component {

    componentWillUnmount() {
        if (this.props.errorMessage) {
            this.props.authError(null);
        }
    }

    handleSubmit({email, password}) {
        this.props.signinUser({email, password});
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
                    <h1>Login</h1>
                    <SigninForm onSubmit={this.handleSubmit.bind(this)} errorMessage={this.props.errorMessage} />
                </div>
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        errorMessage: state.auth.error
    }
}

export default connect(mapStateToProps, actions)(Signin)