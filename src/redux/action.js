/*
전역의 상태르 변경하려면 객체로 만ㄷ르어 action을 보내야하는데
액션 생성 함수 : 인수로 전달될 값을 특정 타입을 지정해 액션 객체에 담아 return하는 함수이다.

이건은 두가지가 무조건 있어야한다?? type?? -> 어떤 action을 지정할건지??
payload에 변경할 파라미터를 전달?

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
