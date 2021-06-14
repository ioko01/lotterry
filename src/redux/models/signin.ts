import { Action } from "redux";

export interface Signin {
    isLoggedin: boolean | null;
}

export interface SigninMap {
    isLoggedin: Signin;
}

export interface SigninState {
    isLoggedin: boolean | null;
}

export interface SigninStateAction extends Action {
    payload?: any;
}
