import { Action } from "redux";

export interface Signin {
    isLoggedin: boolean;
}

export interface SigninMap {
    isLoggedin: Signin;
}

export interface SigninState {
    isLoggedin: boolean;
}

export interface SigninStateAction extends Action {
    payload?: any;
}
