import { useState, useRef, useEffect } from "react";
import Layout from "../common/Layout";

function Community() {
  const input = useRef(null);
  const textarea = useRef(null);

  const dummyPosts = [
    { title: "Hello5", content: "Here comes description in detail." },
    { title: "Hello4", content: "Here comes description in detail." },
    { title: "Hello3", content: "Here comes description in detail." },
    { title: "Hello2", content: "Here comes description in detail." },
    { title: "Hello1", content: "Here comes description in detail." },
  ];
  const [Posts, setPosts] = useState(dummyPosts);

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

  const deletePost = (index) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setPosts(Posts.filter((post, idx) => idx !== index));
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
              <div className="txt">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
              <div className="btnSet">
                <button>EDIT</button>
                <button onClick={() => deletePost(idx)}>DELETE</button>
              </div>
            </article>
          );
        })}
      </div>
    </Layout>
  );
}

export default Community;
