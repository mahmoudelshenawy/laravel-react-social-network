import {
    SIGNUP_DONE,
    SIGNUP_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_DONE,
    LOGIN_FAIL,
    LOGOUT
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuth";
import { setAlert } from "./alert";
// Load User
export const loadUser = () => async dispatch => {
    let config;
    if (localStorage.token) {
        // setAuthToken(localStorage.token);
        config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        };
    }
    try {
        const response = await axios.get("/api/user", config);
        if (!response.data.email) {
            return dispatch({
                type: AUTH_ERROR
            });
        } else {
            return dispatch({
                type: USER_LOADED,
                payload: response.data
            });
        }
    } catch (error) {
        payload({
            type: AUTH_ERROR
        });
    }
};
//Register User
export const register = ({ name, email, password }) => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({ name, email, password });
    axios
        .post("/api/register", body, config)
        .then(data => {
            dispatch({
                type: SIGNUP_DONE,
                payload: data
            });
            dispatch(loadUser());
        })
        .catch(er => {
            dispatch(setAlert("internal server error", "danger"));
            dispatch({
                type: SIGNUP_FAIL
            });
        });
};

export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({ email, password });
    try {
        const response = await axios.post("/api/login", body, config);

        dispatch({
            type: LOGIN_DONE,
            payload: response.data
        });
        dispatch(loadUser());
        location.reload();
    } catch (error) {
        const errors = error.response;
        if (errors.status === 401) {
            dispatch(setAlert("Unauthorized", "danger"));
        } else if (errors.status === 500) {
            dispatch(setAlert("internal server error", "danger"));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};
export const logout = () => async dispatch => {
    let config;
    if (localStorage.token) {
        // setAuthToken(localStorage.token);
        config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        };
    }
    await axios.get("api/logout", config);
    dispatch({
        type: LOGOUT
    });
};
