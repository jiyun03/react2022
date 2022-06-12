import { useState, useRef, useEffect } from "react";
import Layout from "../common/Layout";

function Community() {
  const input = useRef(null);
  const textarea = useRef(null);
  const inputEdit = useRef(null);
  const textareaEdit = useRef(null);

  const dummyPosts = [
    { title: "Hello5", content: "Here comes description in detail." },
    { title: "Hello4", content: "Here comes description in detail." },
    { title: "Hello3", content: "Here comes description in detail." },
    { title: "Hello2", content: "Here comes description in detail." },
    { title: "Hello1", content: "Here comes description in detail." },
  ];
  const [Posts, setPosts] = useState(dummyPosts);
  const [Allowed, setAllowed] = useState(true);

  const resetPosts = () => {
    input.current.value = "";
    textarea.current.value = "";
    if (inputEdit.current) inputEdit.current.value = "";
    if (textareaEdit.current) textareaEdit.current.value = "";
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

  // 게시물을 수정 가능 모드로 변경하는 함수 정의
  const enableUpdate = (index) => {
    if (!Allowed) return;
    setAllowed(false);
    setPosts(
      Posts.map((post, idx) => {
        if (idx === index) post.enableUpdate = true;
        return post;
      })
    );
  };

  // 게시글을 다시 출력모드로 변경하는 함수 정의
  const disableUpdate = (index) => {
    setAllowed(true);
    setPosts(
      Posts.map((post, idx) => {
        if (idx === index) post.enableUpdate = false;
        return post;
      })
    );
  };

  // 게시물 수정 함수
  const updatePost = (index) => {
    if (!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()) {
      resetPosts();
      return alert("수정할 제목과 본문을 입력하세요");
    }

    setPosts(
      Posts.map((post, idx) => {
        if (idx === index) {
          post.title = inputEdit.current.value;
          post.content = textareaEdit.current.value;
          post.enableUpdate = false;
        }
        return post;
      })
    );
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
              {post.enableUpdate ? (
                //수정 모드 UI
                <>
                  <div className="txt">
                    <input
                      type="text"
                      defaultValue={post.title}
                      ref={inputEdit}
                    />
                    <br />
                    <textarea
                      cols="30"
                      rows="5"
                      defaultValue={post.content}
                      ref={textareaEdit}
                    ></textarea>
                  </div>

                  <div className="btnSet">
                    <button onClick={() => disableUpdate(idx)}>CANCEL</button>
                    <button onClick={() => updatePost(idx)}>SAVE</button>
                  </div>
                </>
              ) : (
                //출력모드 UI
                <>
                  <div className="txt">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                  </div>

                  <div className="btnSet">
                    <button onClick={() => enableUpdate(idx)}>EDIT</button>
                    <button onClick={() => deletePost(idx)}>DELETE</button>
                  </div>
                </>
              )}
            </article>
          );
        })}
      </div>
    </Layout>
  );
}

export default Community;
