import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token, 
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => { // expiration time is in seconds
    return dispatch => {
        setTimeout(() => { // setTimeout expects milliseconds
            dispatch(logout());
        }, expirationTime * 1000); // changing seconds to milliseconds
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }; // if sign up
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVQHEVFDg10DtwJO7Nxib-cXy2JmXqb28';
        if (!isSignup) { // if sign-in
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVQHEVFDg10DtwJO7Nxib-cXy2JmXqb28';
        }
        // email-pswd signup/signin on firebase
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                // localStorage is built into javascript
                //we pass the key and the actual item as arguments
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else { // automatically log the user in with a valid token
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // if the expiration time has passed logout
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else { // if the expiration time has not passed the current time yet, login
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                // says how many seconds left until expiration
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) /1000));
            }
        }
    };
};