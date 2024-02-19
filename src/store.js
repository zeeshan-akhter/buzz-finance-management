import { applyMiddleware, createStore } from "redux";
import { financialReducer } from "./financial-reducer";
import {thunk} from "redux-thunk";

const store = createStore(financialReducer, applyMiddleware(thunk));

export { store };
