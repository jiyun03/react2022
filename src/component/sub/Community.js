import { useState, useRef, useEffect } from "react";
import Layout from "../common/Layout";

function Community() {
  const input = useRef(null);
  const textarea = useRef(null);

  const [Posts, setPosts] = useState([]);

  const resetPosts = () => {
    input.current.value = "";
    textarea.current.value = "";
  };

  const createPost = () => {
    if (
      input.current.value.trim() === "" ||
      textarea.current.value.trim() === ""
    ) {
      resetPosts();
      return alert("제목과 본문을 입력하세요");
    }
    setPosts([
      {
        title: input.current.value,
        content: textarea.current.value,
      },
      ...Posts,
    ]);

    resetPosts();
  };

  useEffect(() => {
    console.log(Posts);
  }, [Posts]);

  return (
    <Layout name={"Community"}>
      <div className="inputBox">
        <input type="text" placeholder="제목을 입력하세요" ref={input} /> <br />
        <textarea
          cols="30"
          rows="5"
          placeholder="본문을 입력하세요"
          ref={textarea}
        ></textarea>
        <div className="btnSet">
          <button onClick={resetPosts}>CANCEL</button>
          <button onClick={createPost}>WRITE</button>
        </div>
      </div>

      <div className="showBox">
        {Posts.map((post, idx) => {
          return (
            <article key={idx}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </article>
          );
        })}
      </div>
    </Layout>
  );
}

export default Community;
