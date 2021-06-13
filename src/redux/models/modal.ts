import { Action } from "redux";

export interface Modal {
    modal: boolean;
}

export interface ModalMap {
    modal: Modal;
}

export interface ModalState {
    modal: boolean;
}

export interface ModalStateAction extends Action {
    payload?: any;
}
