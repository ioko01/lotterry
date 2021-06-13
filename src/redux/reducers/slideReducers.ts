import {
    OPEN_SLIDE,
    NEXT_SLIDE,
    PREV_SLIDE,
    CLOSE_SLIDE,
} from "../actions/slideAction";
import { SlideState, SlideStateAction } from "../models/slide";

const initialState: SlideState = {
    slides: {
        1: false,
        2: false,
    },
    direction: {
        "1": "down",
        "2": "down",
    },
};

const slideReducers = (
    state: SlideState = initialState,
    { type }: SlideStateAction
) => {
    switch (type) {
        case OPEN_SLIDE:
            return {
                ...state,
                slides: { 1: true, 2: false },
                direction: { 1: "up", 2: "down" },
            };
        case NEXT_SLIDE:
            return {
                ...state,
                slides: { 1: false, 2: true },
                direction: { 1: "right", 2: "left" },
            };
        case PREV_SLIDE:
            return {
                ...state,
                slides: { 1: true, 2: false },
                direction: { 1: "right", 2: "left" },
            };
        default:
            return state;
    }
};

export default slideReducers;
