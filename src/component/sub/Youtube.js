import Layout from "../common/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Popup from "../common/Popup";

function Youtube() {
  const [Vids, setVids] = useState([]);
  const [Open, setOpen] = useState(false);

  const [Index, setIndex] = useState();

  const fetchYoutube = () => {
    const key = "AIzaSyCCs-4zoiklCU1ygt2QFrB2Jy7nrfJc-dY";
    const playlist = "PL4wM-rifmHleEgufghHbslM5lnMBYdz1v";
    const num = 5;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

    axios.get(url).then((json) => {
      setVids(json.data.items);
    });
  };

  const handlePopup = (index) => {
    setOpen(true);
    setIndex(index);
  };

  useEffect(fetchYoutube, []);

  return (
    <>
      <Layout name={"Youtube"}>
        {Vids.map((vid, idx) => {
          const tit = vid.snippet.title;
          const desc = vid.snippet.description;
          const date = vid.snippet.publishedAt;

          return (
            <article key={idx}>
              <h2>{tit.length > 20 ? tit.substr(0, 20) + "..." : tit}</h2>
              <div className="txt">
                <p>{desc.length > 300 ? desc.substr(0, 300) + "..." : tit}</p>
                <span>{date.split("T")[0]}</span>
              </div>
              <div className="pic" onClick={() => handlePopup(idx)}>
                <img
                  src={vid.snippet.thumbnails.standard.url}
                  alt={vid.snippet.title}
                />
              </div>
            </article>
          );
        })}
      </Layout>
      {Open && (
        <Popup setOpen={setOpen}>
          <iframe
            src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`}
            frameBorder="0"
          ></iframe>
        </Popup>
      )}
    </>
  );
}

export default Youtube;
