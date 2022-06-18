import { useState, useEffect } from "react";

function News() {
  const getLocalDate = () => {
    const data = localStorage.getItem("post");

    const dummyPosts = [
      { title: "Hello5", content: "Here comes description in detail." },
      { title: "Hello4", content: "Here comes description in detail." },
      { title: "Hello3", content: "Here comes description in detail." },
      { title: "Hello2", content: "Here comes description in detail." },
      { title: "Hello1", content: "Here comes description in detail." },
    ];

    if (data) {
      return JSON.parse(data);
    } else {
      return dummyPosts;
    }
  };

  const [Posts] = useState(getLocalDate());

  useEffect(() => {
    localStorage.setItem("post", JSON.stringify(Posts));
  }, []);

  return (
    <section id="news" className="myScroll">
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
