import { SlideStateAction } from "./../models/slide";

export const OPEN_SLIDE = "OPEN_SLIDE";
export const NEXT_SLIDE = "NEXT_SLIDE";
export const PREV_SLIDE = "PREV_SLIDE";
export const CLOSE_SLIDE = "CLOSE_SLIDE";

export const openSlide = (): SlideStateAction => ({
    type: OPEN_SLIDE,
});

export const nextSlide = (): SlideStateAction => ({
    type: NEXT_SLIDE,
});

export const prevSlide = (): SlideStateAction => ({
    type: PREV_SLIDE,
});

export const closeSlide = (): SlideStateAction => ({
    type: CLOSE_SLIDE,
});
