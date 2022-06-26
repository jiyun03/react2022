import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Masonry from "react-masonry-component";

import Layout from "../common/Layout";
import Popup from "../common/Popup";

function Gallery() {
  const frame = useRef(null);
  const masonryOption = {
    transitionDuration: "0.5s",
  };

  const [Items, setItems] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [EnableClick, setEnableClick] = useState(false);
  const input = useRef(null);

  const pop = useRef(null);
  const [Index, setIndex] = useState(0);

  const getFlickr = async (opt) => {
    const key = "4f2ed95542fa600d1ed1488dd32b341b";
    const method_interest = "flickr.interestingness.getList";
    const method_search = "flickr.photos.search";
    const method_user = "flickr.people.getPhotos";
    let url = "";
    if (opt.type === "interest") {
      url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${key}&per_page=${opt.count}&format=json&nojsoncallback=1`;
    } else if (opt.type === "search") {
      url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${key}&per_page=${opt.count}&tags=${opt.tags}&format=json&nojsoncallback=1`;
    } else if (opt.type === "user") {
      url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${key}&per_page=${opt.count}&user_id=${opt.user}&format=json&nojsoncallback=1`;
    }

    await axios.get(url).then((json) => {
      console.log(json.data.photos.photo);
      if (json.data.photos.photo.length === 0)
        return alert("해당 검색어의 결과가 없습니다.");
      setItems(json.data.photos.photo);
    });
    setTimeout(() => {
      frame.current.classList.add("on");
      setLoading(false);
      setEnableClick(true);
    }, 1000);
  };

  const showInterest = () => {
    if (!EnableClick) return;
    setLoading(true);
    frame.current.classList.remove("on");
    getFlickr({
      type: "interest",
      count: 50,
    });
    setEnableClick(false);
  };

  const showSearch = () => {
    const result = input.current.value.trim();
    if (!result) {
      return alert("검색어를 입력하세요");
    }
    if (!EnableClick) return;
    setEnableClick(false);
    setLoading(true);
    frame.current.classList.remove("on");

    getFlickr({
      type: "search",
      count: 50,
      tags: result,
    });

    input.current.value = "";
  };

  useEffect(() => {
    getFlickr({
      type: "user",
      count: 50,
      user: "195927877@N07",
    });
  }, []);

  return (
    <>
      <Layout name={"Gallery"}>
        <button onClick={showInterest}>Interest Gallery</button>
        <div className="searchBox">
          <input
            type="text"
            ref={input}
            onKeyUp={(e) => {
              // if (e.keyCode === "13") {
              //   console.log("keycode");
              // }

              if (e.key === "Enter") showSearch();
            }}
          />
          <button onClick={showSearch}>search</button>
        </div>
        {Loading && (
          <img
            className="loading"
            src={process.env.PUBLIC_URL + "/img/loading.gif"}
          />
        )}
        <article ref={frame}>
          <Masonry elementType={"ul"} options={masonryOption}>
            {Items.map((item, idx) => {
              return (
                <li key={item.id}>
                  <div className="inner">
                    <div
                      className="pic"
                      onClick={() => {
                        setIndex(idx);
                        pop.current.open();
                      }}
                    >
                      <img
                        src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
                        alt={item.title}
                      />
                    </div>
                    <h2>{item.title}</h2>
                    <div className="profile">
                      <img
                        src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
                        alt={item.owner}
                        onError={(e) =>
                          e.target.setAttribute(
                            "src",
                            "https://www.flickr.com/images/buddyicon.gif"
                          )
                        }
                      />
                      <span
                        onClick={(e) => {
                          if (!EnableClick) return;
                          setEnableClick(false);
                          frame.current.classList.remove("on");
                          getFlickr({
                            type: "user",
                            count: 50,
                            user: e.target.innerText,
                          });
                        }}
                      >
                        {item.owner}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </Masonry>
        </article>
      </Layout>

      <Popup ref={pop}>
        {Items.length !== 0 && (
          <img
            src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`}
            alt={Items.title}
          />
        )}
      </Popup>
    </>
  );
}

export default Gallery;
