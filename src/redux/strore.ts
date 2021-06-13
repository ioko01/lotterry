import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import rootReducers from "./reducers/rootReducers";

const makeStore = () => createStore(rootReducers);

export const wrapper = createWrapper(makeStore);
