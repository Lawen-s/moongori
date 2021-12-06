/*global kakao*/

import React, { useEffect } from "react";
import styled from "styled-components";

const StMapstyle = styled.div`
  width: 600px;
  height: 300px;
`;

const { kakao } = window;

const MapContainer = ({ locationInfo }) => {
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);

    const geocoder = new kakao.maps.services.Geocoder();

    let marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(37.537187, 127.005476),
    });
    var iwContent =
        '<div style="padding:5px;">여기서 만나요 <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });
    geocoder.addressSearch(locationInfo, function (results, status) {
      //정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const result = results[0]; //첫번째 결과의 값을 활용

        //해당 주소에 대한 좌표를 받아서
        const coords = new kakao.maps.LatLng(result.y, result.x);
        //지도를 보여준다

        map.relayout();
        // 지도 중심을 변경한다.
        map.setCenter(coords);
        // 마커를 결과값으로 받은 위치로 옮긴다.
        marker.setPosition(coords);

        infowindow.open(map, marker);
      }
    });
  }, [locationInfo]);

  return <StMapstyle id="myMap"></StMapstyle>;
};

export default MapContainer;
