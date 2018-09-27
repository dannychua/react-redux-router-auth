import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions';

class Signout extends Component {

    componentWillMount() {
        this.props.signoutUser();
    }

    render() {
        return (
            <Redirect to='/' />
        )
    }
}

export default connect(null, actions)(Signout)