import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef, useEffect } from "react";

import { useSelector } from "react-redux";

function Vids() {
  const cursor = useRef(null);

  const { youtube } = useSelector((store) => store.youtubeReducer);

  const mouseMove = (e) => {
    cursor.current.style.left = e.clientX + "px";
    cursor.current.style.top = e.clientY + "px";
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <section id="vids" className="myScroll">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
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
            <SwiperSlide key={vid.id}>
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
      <div className="cursor" ref={cursor}></div>
    </section>
  );
}

export default Vids;
