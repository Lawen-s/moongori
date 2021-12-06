import React from "react";
import styled from "styled-components";
import noData from "./../images/noData.png";

const StNoDataDiv = styled.div`
  div {
    font-size: 1.5em;
    margin-bottom: 10px;
    @media all and (max-width: 425px) {
      font-size: 1em;
    }
  }
  .top {
    font-size: 2em;
    @media all and (max-width: 425px) {
      font-size: 1.5em;
    }
  }
  img {
    width: 500px;
    height: 500px;
  }
  text-align: center;
`;

export default function NoData() {
  return (
    <StNoDataDiv>
      <div className={"top"}>찾으시는 게시글이 없습니다.</div>
      <div>첫 게시글 작성자가 되어보세요!</div>
      <img src={noData} alt="데이터없음"></img>
    </StNoDataDiv>
  );
}
