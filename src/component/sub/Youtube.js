import Layout from "../common/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

function Youtube() {
  const [vids, setVids] = useState([]);

  const key = "AIzaSyCCs-4zoiklCU1ygt2QFrB2Jy7nrfJc-dY";
  const playlist = "PL4wM-rifmHleEgufghHbslM5lnMBYdz1v";
  const num = 5;
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

  useEffect(() => {
    axios.get(url).then((json) => {
      setVids(json.data.items);
    });
  }, []);

  return (
    <Layout name={"Youtube"}>
      {vids.map((vid, idx) => {
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
            <div className="pic">
              <img
                src={vid.snippet.thumbnails.standard.url}
                alt={vid.snippet.title}
              />
            </div>
          </article>
        );
      })}
    </Layout>
  );
}

export default Youtube;
