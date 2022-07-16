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
import axios from "axios";
import { useDispatch } from "react-redux";
import { setYoutube, setMembers } from "./redux/action";

const path = process.env.PUBLIC_URL;

function App() {
  const dispatch = useDispatch();

  const fetchYoutube = async () => {
    const key = "AIzaSyCCs-4zoiklCU1ygt2QFrB2Jy7nrfJc-dY";
    const playlist = "PL4wM-rifmHleEgufghHbslM5lnMBYdz1v";
    const num = 5;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

    await axios.get(url).then((json) => {
      dispatch(setYoutube(json.data.items));
    });
  };

  const fetchMembers = async () => {
    await axios.get(`${path}/DB/member.json`).then((json) => {
      dispatch(setMembers(json.data.members));
    });
  };

  useEffect(() => {
    fetchYoutube();
    fetchMembers();
    // 처음 앱 컴포넌트가 구동되면 일단 대인 계쩡의 데이터 옵션을 saga로 액션객테에 담아 보낸다.
    //saga -> reducer -> store -> index를 거쳐 어떤 컴포넌트에서든 useSelectoer Flickr데이터 접근 가능
    dispatch({
      type: "FLICKR_START",
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
