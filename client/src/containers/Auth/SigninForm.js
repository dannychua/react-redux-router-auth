import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { renderTextField } from './FormHelpers';
import { Form, Button } from 'reactstrap';

class SigninForm extends Component {

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Error: </strong> { this.props.errorMessage }
                </div>
            )
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>

                { this.renderAlert() }

                <Form onSubmit={ handleSubmit }>
                    <Field
                        label="Email"
                        name="email"
                        component={renderTextField}
                        type="text"
                    />
                    
                    <Field
                        label="Password"
                        name="password"
                        component={renderTextField}
                        type="password"
                    />

                    <Button color="primary" type="submit">Sign In</Button>

                </Form>

            </div>
        )
    }
}

const validate = values => {
    let errors = {}

    if (!values.email) {
        errors.email = 'Please enter an email';
    }

    if (!values.password) {
        errors.password = 'Please enter an password';
    }

    return errors;
}

export default reduxForm({
    form: 'signin',
    validate
})(SigninForm)