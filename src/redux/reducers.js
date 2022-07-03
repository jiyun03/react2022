import { combineReducers } from "redux";

/*
  Reducer: 전역공간의 데이터인 store에 초기 데이터를 전달해주거나 기존 데이터를 변경해준다 (변경자)
*/

/*
reducer에 상수 값으로 member 데이터를 연결하는 것이 아닌 youtube 처럼 public > DB 안쪽의 member.json 데이터를
비동기 서버 통신 해서 상태 관리 하도록 수정한다.

const initMember = {
  members: [
    {
      name: "Julia",
      position: "CEO",
      pic: "member1.jpg",
    },
    {
      name: "David",
      position: "Vice President",
      pic: "member2.jpg",
    },
    {
      name: "Emily",
      position: "Back-End Dev",
      pic: "member3.jpg",
    },
    {
      name: "Paul",
      position: "Front-End Dev",
      pic: "member4.jpg",
    },
    {
      name: "Peter",
      position: "UI Designer",
      pic: "member5.jpg",
    },
  ],
};
*/

/*
  초기데이터를 state에 저장했다가
  추후 action 객체가 전달되면
  action 객체의 타입에 따라 기존 데이터를 변경해서 return

  따로 state가 없으면 initMember를 초기값으로 쓴다.
*/
const memberReducer = (state = { members: [] }, action) => {
  switch (action.type) {
    case "SET_MEMBERS":
      return { ...state, members: action.payload };

    default:
      return state;
  }
};

const youtubeReducer = (state = { youtube: [] }, action) => {
  switch (action.type) {
    case "SET_YOUTUBE":
      return { ...state, youtube: action.payload };

    default:
      return state;
  }
};

const flickrReducer = (state = { flickr: [] }, action) => {
  switch (action.type) {
    case "FLICKR_START":
      return { ...state };

    case "FLICKR_SUCCESS":
      return { ...state, flickr: action.payload };

    default:
      return state;
  }
};

//전달된 각각의 reducer를 하나로 합쳐서 반환
const reducers = combineReducers({
  memberReducer,
  youtubeReducer,
  flickrReducer,
});

export default reducers;
