/*
전역의 상태를 변경하려면 객체로 만들어 action을 보내야하는데
액션 생성 함수 : 인수로 전달될 값을 특정 타입을 지정해 액션 객체에 담아 return하는 함수이다.

이건은 두가지가 무조건 있어야한다.
어떤 데이터 타입인지 지정하는 type과 변경할 데이터를 담을 payload 값
payload에 변경할 데이터를 담아서 보낸다. 이 변경할 데이터는 파라미터에 저장되는 값이다.

변경할 데이터를 setMember 함수에 인수로 전달해 호출하면 setMembers(변경할 멤버데이터)

다음과 같은 액션 객체를 반환
{
  type: "SET_MEMBERS",
  payload: member,
}
*/

export const setMembers = (member) => {
  return {
    type: "SET_MEMBERS",
    payload: member,
  };
};

export const setYoutube = (data) => {
  return {
    type: "SET_YOUTUBE",
    payload: data,
  };
};

/*
  redux 작업 흐름
  - 컴포넌트에서 axios 데이터 요청을 해서 반환된 경과 값을 action 생성함수를 통해 dispatch로 해당 액션 객체를 리듀서에 전달한다.
  - 리듀서는 액션 객체를 인수로 받아서 type에 따라 데이터를 변형한 뒤, 스토어에 전달한다.
  - 스토어는 이듀서로부터 전달 받은 state 정보 값을 store에 저장하고 index.js를 통해서 Provide로 루트 컴포넌트 App에 데이터를 전달한다.
  - 각 자식 컴포넌트는 useSelector 를 통해서 store 데이터를 전달 받아 출력한다.
  - 자식 컴포넌트에서 store 전역 데이터 변경을 위해 다시 변경항 데이터를 action 객체로 만들어서 useDispatch를 통해 dispatch로 전달한다.
  == 위 작업의 단점 ==
  - 각 컴포넌트에 수정될 데이터가 API 서버 통신을 필요로하는 비동기 데이터일 경우 axios 함수 관리가 어려워진다.
  - 해당 문제점을 개선하기 위해서 axios 데이터 통신 함수를 순수 함수 형태로 따로 관리하기 위해 redux-saga를 이용한다.

  redux-saga의 작업 흐름
  - 기존 리듀서의 액션 타입을 요청시작, 응답성공, 응답실패로 좀 더 세분화 한다.
  - 리듀서에 saga 작업을 중간에 연결해서 store에 저장하기 위한 미들웨어 설정을 store.js에 추가한다.
  - 기존처럼 컴포넌트에서 axios 요청을 하는 것이 아닌 API.js 라는 요청 함수 모듈을 따로 만들어서 관리한다.
  - 컴포넌트에서 axios 호출시 필요한 인수 값을 action 객체에 담아서 saga 요청을 한다.
  - saga는 api 요청 모듈에서 axios 함수를 불러오고 컴포넌트에서는 전달 받은 인수 값이 담긴 action 객체를 연결해서 호출한다.
  - 반환된 결과값을 제너레이터 함수로 실행하고 최종 전달 받은 결과값을 다시 action 객체로 리듀서에 전달한다.
  - 리듀서는 전달 받은 데이터를 store에 저장한다.
*/
