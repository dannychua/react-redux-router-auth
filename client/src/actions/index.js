import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';
const ROOT_URL = 'http://localhost:4000';

export function signinUser({email, password}) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, {email, password})
            .then(response => {
                // Save the JWT token
                localStorage.setItem('token', response.data.token);

                // Update state indicating that user is authenticated
                dispatch({type: AUTH_USER});
            })
            .catch(({response}) => {
                dispatch(authError('Bad login info'));
            })
    }
}

export function signupUser({email, password, passwordConfirmation}) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, {email, password, passwordConfirmation})
            .then(response => {
                // Save the JWT token
                localStorage.setItem('token', response.data.token);

                // Update state indicating that user is authenticated
                dispatch({type: AUTH_USER});
            })
            .catch(({response}) => {
                dispatch(authError(response.data.error));
            })
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    return { type: UNAUTH_USER }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function fetchMessage() {
    return function(dispatch) {
        axios
            .get(`${ROOT_URL}`, {
                headers: {authorization: localStorage.getItem('token')}
            })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            })
    }
}