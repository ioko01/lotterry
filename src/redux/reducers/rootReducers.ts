import cartReducer from "./cartReducers";
import { combineReducers } from "redux";
import modalReducers from "./openModalReducers";
import slideReducers from "./slideReducers";

const rootReducers = combineReducers({
    modal: modalReducers,
    carts: cartReducer,
    slides: slideReducers,
});

export default rootReducers;
