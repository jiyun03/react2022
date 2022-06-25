import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Masonry from "react-masonry-component";

import Layout from "../common/Layout";

function Gallery() {
  const key = "4f2ed95542fa600d1ed1488dd32b341b";
  const method_interest = "flickr.interestingness.getList";
  const method_search = "flickr.photos.search";
  const num = 50;
  const url_interest = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${key}&per_page=${num}&format=json&nojsoncallback=1`;
  const url_search = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${key}&per_page=${num}&tags=${"ocean"}&format=json&nojsoncallback=1`;
  const frame = useRef(null);
  const masonryOption = {
    transitionDuration: "0.5s",
  };

  const [Items, setItems] = useState([]);

  const getFlickr = async (url) => {
    await axios.get(url).then((json) => {
      console.log(json.data.photos.photo);
      setItems(json.data.photos.photo);
    });
    frame.current.classList.add("on");
  };

  useEffect(() => {
    getFlickr(url_search);
  }, []);

  return (
    <Layout name={"Gallery"}>
      <button
        onClick={() => {
          frame.current.classList.remove("on");
          getFlickr(url_interest);
        }}
      >
        Interest Gallery
      </button>
      <button
        onClick={() => {
          frame.current.classList.remove("on");
          getFlickr(url_search);
        }}
      >
        Search Gallery
      </button>
      <div className="motion" ref={frame}>
        <Masonry elementType={"ul"} options={masonryOption}>
          {Items.map((item) => {
            return (
              <li key={item.id}>
                <div className="inner">
                  <div className="pic">
                    <img
                      src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
                      alt={item.title}
                    />
                  </div>
                  <h2>{item.title}</h2>
                </div>
              </li>
            );
          })}
        </Masonry>
      </div>
      <p>Gallery</p>
    </Layout>
  );
}

export default Gallery;
