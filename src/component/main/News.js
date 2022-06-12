import { useState } from "react";

function News() {
  const getLocalDate = () => {
    const data = localStorage.getItem("post");
    return JSON.parse(data);
  };

  const [Posts] = useState(getLocalDate());

  return (
    <section id="news">
      {Posts.map((post, idx) => {
        if (idx < 4) {
          return (
            <article key={idx}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </article>
          );
        }
      })}
    </section>
  );
}

export default News;
