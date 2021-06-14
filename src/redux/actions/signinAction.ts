import { SigninStateAction } from "../models/signin";

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export const signin = (): SigninStateAction => ({
    type: SIGN_IN,
});

export const signout = (): SigninStateAction => ({
    type: SIGN_OUT,
});
