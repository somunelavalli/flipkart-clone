import axios from "../../helpers/axios";
import { authConstants } from "./constants";

export const login = (user) => {
  console.log(user);
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axios.post("/auth/login", { ...user });
    console.log(res);
    if (res.status === 200) {
      const { accessToken, ...user } = res.data;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: { user, accessToken },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          user,
          token,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const res = await axios.post(`/auth/logout`);

    if (res.status === 200) {
      localStorage.clear();
      dispatch({ type: authConstants.LOGOUT_SUCCESS });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
