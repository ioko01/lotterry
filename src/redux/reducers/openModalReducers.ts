import { ModalStateAction, ModalState } from "./../models/modal";
import { OPEN_MODAL, CLOSE_MODAL } from "../actions/openModalActions";

const initialState: ModalState = {
    modal: false,
};

const modalReducers = (
    state: ModalState = initialState,
    { type }: ModalStateAction
) => {
    switch (type) {
        case OPEN_MODAL:
            return { ...state, modal: true };
        case CLOSE_MODAL:
            return { ...state, modal: false };
        default:
            return state;
    }
};

export default modalReducers;
