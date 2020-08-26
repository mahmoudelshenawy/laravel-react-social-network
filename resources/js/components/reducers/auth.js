import {
    SIGNUP_DONE,
    SIGNUP_FAIL,
    LOGIN_FAIL,
    LOGIN_DONE,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuth: false,
    user: {},
    loading: true
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuth: true,
                loading: false,
                user: payload
            };
        case SIGNUP_DONE:
            localStorage.setItem("token", payload.data.access_token);
            return {
                ...state,
                isAuth: true,
                token: localStorage.getItem("token"),
                loading: false
            };
        case LOGIN_DONE:
            localStorage.setItem("token", payload.access_token);
            return {
                ...state,
                isAuth: true,
                token: localStorage.getItem("token"),
                loading: false
            };
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuth: false,
                loading: false
            };
        default:
            return state;
    }
}
