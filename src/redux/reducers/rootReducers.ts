import cartReducer from "./cartReducers";
import { combineReducers } from "redux";
import modalReducers from "./openModalReducers";
import slideReducers from "./slideReducers";
import signinReducers from "./signinReducers";

const rootReducers = combineReducers({
    modal: modalReducers,
    carts: cartReducer,
    slides: slideReducers,
    isLoggedin: signinReducers,
});

export default rootReducers;
