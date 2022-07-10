/*
  takeLatest : action 요청이 단기간에 여러번 들어오면 제일 최근 요청 하나만 실행한다.(들어 오는 요청을 모두 처리하는 takeEvery도 있다.)
  all : saga 안에서 여러개의 요청 함수를 병렬식으로 동시에 처리한다.
  call : 특정함수를 동기적으로 호출한다. (api 요청 시 주로 사용한다. 두번 째 인수값으로 api 요청이 필요한 옵션값을 전달할 수 있다.)
  fork : saga 전용 실행함수.
  put : saga에서 리듀서로 액션객체를 전달할 때 사용한다.
*/

import { takeLatest, all, put, fork, call } from "redux-saga/effects";
import { fetchFlickr } from "./api";

// 컴포넌트에서 받은 인수값을 api.js에 있는 axios 함수에 연결하는 함수
export function* returnFlickr(action) {
  const response = yield call(fetchFlickr, action.Opt);
  yield put({ type: "FLICKR_SUCCESS", payload: response.data.photos.photo });
}

// 요청 받은 액션 타입에 따라 함수 호출
export function* callFlickr() {
  yield takeLatest("FLICKR_START", returnFlickr);
}

// reducer에 적용될 rootSaga 생성함수를 내보낸다.
export default function* rootSaga() {
  yield all([fork(callFlickr)]);
}
