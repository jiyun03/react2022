import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Popup from "../common/Popup";

function Vids() {
  const cursor = useRef(null);
  const frame = useRef(null);

  const [Index, setIndex] = useState(0);
  const pop = useRef(null);

  let isCursor = false;

  const handlePopup = (index) => {
    setIndex(index);
    pop.current.open();
  };

  const { youtube } = useSelector((store) => store.youtubeReducer);

  const mouseMove = (e) => {
    if (isCursor !== true) return;
    cursor.current.style.left = e.clientX + "px";
    cursor.current.style.top = e.clientY + "px";
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    frame.current.addEventListener("mousemove", () => {
      isCursor = true;
      cursor.current.style.display = "block";
    });
    frame.current.addEventListener("mouseleave", () => {
      isCursor = false;
      cursor.current.style.display = "none";
    });
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <section id="vids" className="myScroll" ref={frame}>
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        loop={false}
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides={true}
        breakpoints={{
          760: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        {youtube.map((vid, idx) => {
          if (idx > 5) return;
          return (
            <SwiperSlide key={vid.id} onClick={() => handlePopup(idx)}>
              <div
                className="inner"
                onMouseEnter={() =>
                  (cursor.current.style =
                    "transform: translate(-50%, -50%) scale(3) ")
                }
                onMouseLeave={() =>
                  (cursor.current.style =
                    "transform: translate(-50%, -50%) scale(1)  ")
                }
              >
                <div className="pic">
                  <img
                    src={vid.snippet.thumbnails.standard.url}
                    alt={vid.snippet.title}
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Popup ref={pop}>
        {youtube.length !== 0 && (
          <iframe
            src={`https://www.youtube.com/embed/${youtube[Index].snippet.resourceId.videoId}`}
            frameBorder="0"
          ></iframe>
        )}
      </Popup>
      <div className="cursor" ref={cursor}></div>
    </section>
  );
}

export default Vids;
