import { SigninStateAction } from "../models/signin";

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export const loginState = (): SigninStateAction => ({
    type: SIGN_IN,
});

export const logoutState = (): SigninStateAction => ({
    type: SIGN_OUT,
});
