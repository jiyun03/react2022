import Layout from "../common/Layout";
// import axios from "axios";
// import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

const path = process.env.PUBLIC_URL;

function Department() {
  // const [members, setMembers] = useState([]);
  const { members } = useSelector((store) => store.memberReducer);

  // useEffect(() => {
  //   axios.get(`${path}/DB/member.json`).then((json) => {
  //     setMembers(json.data.member);
  //   });
  // }, []);

  return (
    <Layout name={"Department"}>
      <div className="wrap">
        {members.map((mem, idx) => {
          return (
            <article key={idx}>
              <div className="inner">
                <div className="pic">
                  <img src={`${path}/img/${mem.pic}`} alt={mem.name} />
                </div>
                <h2>{mem.name}</h2>
                <p>{mem.position}</p>
              </div>
            </article>
          );
        })}
      </div>
    </Layout>
  );
}

export default Department;
