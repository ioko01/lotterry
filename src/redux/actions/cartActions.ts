import { Lottory } from "../../models/Lottory";
import { CartStateAction } from "../models/cart";

export const ADD_CART = "ADD_CART";
export const DELETE_CART = "DELETE_CART";
export const CLEAR_CART = "CLEAR_CART";

export const addCart = (data: Lottory): CartStateAction => ({
    type: ADD_CART,
    payload: data,
});

export const deletetCart = (index: number): CartStateAction => ({
    type: DELETE_CART,
    payload: index,
});

export const clearCart = (): CartStateAction => ({
    type: CLEAR_CART,
    payload: [],
});
