import { ADD_CART, DELETE_CART, CLEAR_CART } from "../actions/cartActions";
import { CartState, CartStateAction } from "../models/cart";

const initialState: CartState = {
    carts: [],
};
const cartReducers = (
    state: CartState = initialState,
    { type, payload }: CartStateAction
): CartState => {
    switch (type) {
        case ADD_CART:
            return { carts: [...state.carts, payload] };
        case DELETE_CART:
            return {
                carts: state.carts.filter((_, index) => index !== payload),
            };
        case CLEAR_CART:
            return { carts: [] };
        default:
            return state;
    }
};

export default cartReducers;
