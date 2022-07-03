import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import createSagaMiddleware from "@redux-saga/core";
import rootSage from "./saga";

const SagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(SagaMiddleware));
SagaMiddleware.run(rootSage);

// store 공간을 생성한 다음 전달 된 reducer를 store에 저장해서 내보냄
// const store = createStore(reducers);
export default store;
