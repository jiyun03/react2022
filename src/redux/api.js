/*
redux로 관리되는 파일들은 컴포넌트 외부에서 컴포넌트 의존성 없이 전역으로 동작하기 때문에 부수효과가 발생되지 않는 형태로 제작한다.
부수효과(SideEffect) : Dom 요소 같이 컴포넌트가 제어해야 되는 화면의 변경점을 야기시키는 효과
순수함수(Pure function) : 부수효과를 발생시키지 않는 함수
*/

import axios from "axios";

export const fetchFlickr = async (opt) => {
  const key = "4f2ed95542fa600d1ed1488dd32b341b";
  const method_interest = "flickr.interestingness.getList";
  const method_search = "flickr.photos.search";
  const method_user = "flickr.people.getPhotos";
  let url = "";
  if (opt.type === "interest") {
    url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${key}&per_page=${opt.count}&format=json&nojsoncallback=1`;
  } else if (opt.type === "search") {
    url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${key}&per_page=${opt.count}&tags=${opt.tags}&format=json&nojsoncallback=1`;
  } else if (opt.type === "user") {
    url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${key}&per_page=${opt.count}&user_id=${opt.user}&format=json&nojsoncallback=1`;
  }

  return await axios.get(url);
};

export const fetchMember = async () => {
  const url = `${process.env.PUBLIC_URL}/DB/member.json`;
  return await axios.get(url);
};

export const fetchYoutube = async () => {
  const key = "AIzaSyCCs-4zoiklCU1ygt2QFrB2Jy7nrfJc-dY";
  const playlist = "PL4wM-rifmHleEgufghHbslM5lnMBYdz1v";
  const num = 5;
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

  return await axios.get(url);
};
