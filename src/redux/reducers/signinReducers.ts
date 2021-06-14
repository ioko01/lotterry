import { SigninStateAction, SigninState } from "./../models/signin";
import { SIGN_IN, SIGN_OUT } from "../actions/signinAction";

const initialState: SigninState = {
    isLoggedin: false,
};

const signinReducers = (
    state: SigninState = initialState,
    { type }: SigninStateAction
) => {
    switch (type) {
        case SIGN_IN:
            return { ...state, isLoggedin: true };
        case SIGN_OUT:
            return { ...state, isLoggedin: false };
        default:
            return state;
    }
};

export default signinReducers;
