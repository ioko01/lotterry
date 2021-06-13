import { Action } from "redux";
import { Lottory } from "../../models/Lottory";

export interface Cart {
    carts: Lottory[];
}

export interface CartMap {
    carts: Cart;
}

export interface CartState {
    carts: Lottory[];
}

export interface CartStateAction extends Action {
    payload: any;
}
