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
  const dispatchMember = useDispatch();
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
      dispatchMember(setMembers(json.data.members));
    });
  };

  useEffect(() => {
    fetchYoutube();
    fetchMembers();
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
