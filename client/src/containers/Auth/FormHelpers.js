import React from 'react';
import { FormGroup, Label, Input, Alert } from 'reactstrap';

export const renderTextField = ({input, type, label, meta: {touched, error}, ...custom}) => (
    <div>
        <FormGroup>
            <Label>{ label }</Label>
            <Input
                type={type}
                value={input.value}
                onChange={input.onChange}
            />
            {touched && error && <Alert color="warning">{ error }</Alert>}
        </FormGroup>
    </div>
)