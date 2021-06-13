import { Action } from "redux";

export type SlideDirection = "left" | "right" | "up" | "down";

export interface Slide {
    slides: {
        1: boolean;
        2: boolean;
    };
    direction: {
        1: SlideDirection;
        2: SlideDirection;
    };
}

export interface SlideMap {
    slides: Slide;
}

export interface SlideState {
    slides: {
        1: boolean;
        2: boolean;
    };
    direction: {
        1: SlideDirection;
        2: SlideDirection;
    };
}

export interface SlideStateAction extends Action {
    payload?: any;
}
