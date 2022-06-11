import Layout from "../common/Layout";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Join() {
  const initVal = {
    userid: "",
    email: "",
    pwd1: "",
    pwd2: "",
    gender: null,
    interests: null,
    edu: null,
    comments: "",
  };

  const [Val, setVal] = useState(initVal);
  const [Err, setErr] = useState({});
  const [Success, setSuccess] = useState(false);
  const [Submit, setSubmit] = useState(false);
  const history = useHistory();

  // 순서3 : 인수로 전달되는 값으로 인증처리 해서 에러 객체 값 반환 함수
  const check = (val) => {
    const errs = {};
    const eng = /[a-zA-Z]/;
    const num = /[0-9]/;
    const spc = /[!@#$%^&*()_+]/;

    // userid 체크 항목
    if (val.userid.length < 5) {
      errs.userid = "아이디를 5글자 이상 입력해 주세요.";
    }
    // email 체크 항목
    if (val.email.length < 8 || !/@/.test(val.email)) {
      errs.email = "이메일은 최소 8글자 이상 @를 포함해 주세요.";
    }
    // pwd1 체크 항목
    if (
      val.pwd1.length < 5 ||
      !eng.test(val.pwd1) ||
      !num.test(val.pwd1) ||
      !spc.test(val.pwd1)
    ) {
      errs.pwd1 =
        "비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함해 주세요.";
    }
    // pwd2 체크 항목
    if (val.pwd1 !== val.pwd2 || !val.pwd2) {
      errs.pwd2 = "비밀번호를 동일하게 입력해 주세요.";
    }
    // gender 체크 항목
    if (!val.gender) {
      errs.gender = "성별을 선택하세요.";
    }
    if (!val.interests) {
      errs.interests = "관심사를 하나이상 선택하세요.";
    }
    if (val.edu === "") {
      errs.edu = "최종학력을 선택하세요.";
    }
    if (val.comments.length < 20) {
      errs.comments = "남기는 말은 20글자 이상 입력하세요.";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("name : ", name);
    // console.log("value : ", value);
    // 객체에서 변수값을 key에 넣을 수가 없음
    // 객체에서 변수값을 key 값으로 활용하려면 객체안에서 변수명을 대괄호로 묶어줌
    // setVal({...Val, userid : 현재 입력된 값})
    setVal({ ...Val, [name]: value });
  };

  const handleRadio = (e) => {
    const { name } = e.target;
    const isCheck = e.target.checked;
    setVal({ ...Val, [name]: isCheck });
  };

  const handleCheck = (e) => {
    let isCheck = false;
    const { name } = e.target;
    const inputs = e.target.parentElement.querySelectorAll("input");

    inputs.forEach((el) => {
      if (el.checked) isCheck = true;
    });

    setVal({ ...Val, [name]: isCheck });
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;
    // const isSelected = e.target.option[e.target.selectedIndex].value
    setVal({ ...Val, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 순서2 : check 함수를 호출해서 현재 Val state에 담겨 있는 값을 check 함수의 인수로 전달해서 err 객체를 생성해서 반환
    // 그렇게 반환된 err 객체를 다시 Err state에 옮겨담음
    setSubmit(true);
    setErr(check(Val));
  };

  useEffect(() => {
    const len = Object.keys(Err).length;
    // (len === 0) ? setSuccess(true) : setSuccess(false)

    if (len === 0 && Submit) {
      setSuccess(true);
      history.push("/");
      window.scroll(0, 0);
    } else {
      setSuccess(false);
    }
  }, [Err]);

  return (
    <Layout name={"Join"}>
      {/* 순서1 : 전송 버튼을 눌러서 handleSubmit 함수 호출 */}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>회원가입 폼 양식</legend>
          <table border="1">
            <caption>회원가입 정보 입력</caption>
            <tbody>
              {/* userid */}
              <tr>
                <th scope="row">
                  <label htmlFor="userid">USER ID</label>
                </th>
                <td>
                  <input
                    type="text"
                    id="userid"
                    name="userid"
                    placeholder="아이디를 입력하세요"
                    value={Val.userid}
                    onChange={handleChange}
                  />
                  <span className="err">{Err.userid}</span>
                </td>
              </tr>
              {/* email */}
              <tr>
                <th scope="row">
                  <label htmlFor="email">E-MAIL</label>
                </th>
                <td>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="이메일 주소를 입력하세요"
                    value={Val.email}
                    onChange={handleChange}
                  />
                  <span className="err">{Err.email}</span>
                </td>
              </tr>
              {/* gender */}
              <tr>
                <th scope="row">GENDER</th>
                <td>
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    onChange={handleRadio}
                  />

                  <label htmlFor="female">Female</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    onChange={handleRadio}
                  />
                  <span className="err">{Err.gender}</span>
                </td>
              </tr>
              {/* interests */}
              <tr>
                <th scope="row">INTERESTS</th>
                <td>
                  <label htmlFor="sports">Sports</label>
                  <input
                    type="checkbox"
                    id="sports"
                    name="interests"
                    onChange={handleCheck}
                  />

                  <label htmlFor="music">Music</label>
                  <input
                    type="checkbox"
                    id="music"
                    name="interests"
                    onChange={handleCheck}
                  />

                  <label htmlFor="game">Game</label>
                  <input
                    type="checkbox"
                    id="game"
                    name="interests"
                    onChange={handleCheck}
                  />

                  <span className="err">{Err.interests}</span>
                </td>
              </tr>
              {/* pwd1 */}
              <tr>
                <th scope="row">
                  <label htmlFor="pwd1">PASSWORD</label>
                </th>
                <td>
                  <input
                    type="password"
                    id="pwd1"
                    name="pwd1"
                    placeholder="비밀번호를 입력하세요"
                    value={Val.pwd1}
                    onChange={handleChange}
                  />
                  <span className="err">{Err.pwd1}</span>
                </td>
              </tr>
              {/* pwd2 */}
              <tr>
                <th scope="row">
                  <label htmlFor="pwd2">RE-PASSWORD</label>
                </th>
                <td>
                  <input
                    type="password"
                    id="pwd2"
                    name="pwd2"
                    placeholder="비밀번호를 재입력하세요"
                    value={Val.pwd2}
                    onChange={handleChange}
                  />
                  <span className="err">{Err.pwd2}</span>
                </td>
              </tr>
              {/* edu */}
              <tr>
                <th scope="row">
                  <label htmlFor="edu">EDUCATION</label>
                </th>
                <td>
                  <select name="edu" id="edu" onChange={handleSelect}>
                    <option value="">학력을 선택하세요</option>
                    <option value="elementary-school">초등학교 졸업</option>
                    <option value="middle-school">중학교 졸업</option>
                    <option value="high-school">고등학교 졸업</option>
                    <option value="college">대학교 졸업</option>
                  </select>
                  <span className="err">{Err.edu}</span>
                </td>
              </tr>
              {/* comments */}
              <tr>
                <th scope="row">
                  <label htmlFor="comments">COMMENTS</label>
                </th>
                <td>
                  <textarea
                    name="comments"
                    id="comments"
                    cols="30"
                    rows="5"
                    placeholder="남기는 말을 입력해 주세요."
                    onChange={handleChange}
                  ></textarea>
                  <span className="err">{Err.comments}</span>
                </td>
              </tr>
              {/* btnSet */}
              <tr>
                <th colSpan="2">
                  <input type="reset" value="CANCEL" />
                  <input type="submit" value="SUBMIT" />
                </th>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
    </Layout>
  );
}

export default Join;

/*
	1. 전송 버튼을 눌러서 handleSubmit 함수 호출 
	2. check 함수를 호출해서 현재 Val state에 담겨 있는 값을 check 함수의 인수로 전달해서 err 객체를 생성해서 반환 그렇게 반환된 err 객체를 다시 Err state에 옮겨담음
	3. 인수로 전달되는 값으로 인증처리 해서 에러 객체 값 반환 함수
*/
