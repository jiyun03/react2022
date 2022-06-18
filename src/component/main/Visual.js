import { useRef } from "react";

function Visual() {
  const box = useRef();
  const style = {
    width: 100,
    height: 100,
    backgroundColor: "aqua",
    position: "absolute",
    top: 100,
    left: 100,
  };

  return <figure id="visual" className="myScroll"></figure>;
}

export default Visual;
