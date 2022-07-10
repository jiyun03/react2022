// 미들웨어 모듈 import
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
// saga 미들웨어 모듈 import
import createSagaMiddleware from "@redux-saga/core";
// 미들웨어 적용할 saga 파일 import
import rootSage from "./saga";

// SagaMiddleware 함수 활성화
const SagaMiddleware = createSagaMiddleware();
// store 생성시 applyMiddleware로 활성화 된 SagaMiddleware 적용
const store = createStore(reducers, applyMiddleware(SagaMiddleware));

// store에 적용된 SagaMiddleware를 통해서 rootSaga 기능 활성화
SagaMiddleware.run(rootSage);

// store 공간을 생성한 다음 전달 된 reducer를 store에 저장해서 내보냄
// const store = createStore(reducers);
export default store;
