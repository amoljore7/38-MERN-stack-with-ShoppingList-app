import axios from "axios";
import { returnErrors, clearErrors } from "./errorAction";

import {
  USER_LOADING,
  USER_LOADER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// Check Token and load user

export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  // Get token from local storage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .get("/api/auth/user", config)
    .then((res) =>
      dispatch({
        type: USER_LOADER,
        payload: res.data,
      })
    )
    .catch((err) => {
        dispatch( returnErrors(err.res))
      dispatch({
        type: AUTH_ERROR,
      });
    });
};
