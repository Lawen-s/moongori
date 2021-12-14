import React from "react";
import styled from "styled-components";
import unknown from "../images/unknown.png";
const NotFoundBox = styled.div`
  margin-bottom:200px;
  width: 100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media all and (max-width: 768px) {
    margin-bottom:300px;
  }
  .NotFoundImg-wrap {
    width: 60%;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media all and (max-width: 768px) {
      width: 80%;
      margin-top:200px;
      height: 300px;
    }
    .NotFoundImg {
      width: 500px;
      height: 500px;
      @media all and (max-width: 768px) {
        width: 300px;
        height: 300px;
      }
    }
  }
`;

export default function NewsPostWrite() {
  return (
    <>
      <NotFoundBox>
        <div className={"NotFoundImg-wrap"}>
          <img src={unknown} className={"NotFoundImg"} alt={"404페이지"}></img>
        </div>
      </NotFoundBox>
    </>
  );
}
