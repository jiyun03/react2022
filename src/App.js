//common
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";

//main
import Main from "./component/main/Main";

//sub
import Department from "./component/sub/Department";
import Community from "./component/sub/Community";
import Gallery from "./component/sub/Gallery";
import Youtube from "./component/sub/Youtube";
import Location from "./component/sub/Location";
import Join from "./component/sub/Join";

import { Route, Switch } from "react-router-dom";
import "./scss/style.scss";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import axios from "axios";
// import { setYoutube } from "./redux/action";
import * as types from "./redux/actionType";

const path = process.env.PUBLIC_URL;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 처음 앱 컴포넌트가 구동되면 일단 인 계정의 데이터 옵션을 saga로 액션객체에 담아 보낸다.
    //saga -> reducer -> store -> index를 거쳐 어떤 컴포넌트에서든 useSelectoer Flickr데이터 접근 가능
    dispatch({ type: types.MEMBER.start });
    dispatch({ type: types.YOUTUBE.start });
    dispatch({
      type: types.FLICKR.start,
      Opt: {
        type: "user",
        count: 50,
        user: "195927877@N07",
      },
    });
  }, []);

  return (
    <>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/" render={() => <Header type={"sub"} />} />
      </Switch>

      <Route path="/department" component={Department} />
      <Route path="/community" component={Community} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/youtube" component={Youtube} />
      <Route path="/location" component={Location} />
      <Route path="/join" component={Join} />

      <Footer />
    </>
  );
}
export default App;
