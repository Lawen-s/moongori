import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StNewsDiv = styled.div`
  border: 2px solid #92e3a9;
  border-radius: 10px;
  max-width: ${(props) => (props.mypage ? "800px" : null)};
  width: ${(props) => (props.mypage ? "70%" : "100%")};
  height: ${(props) => (props.mypage ? "138px" : "150px")};
  margin-bottom: 40px;
  a {
    color: black;
    text-decoration: none;
  }
  :hover {
    box-shadow: gray 10px 10px 5px;
  }
  :active {
    box-shadow: none;
  }
`;

const StContentsDiv = styled.div`
  margin: 10px 10px 5px 10px;
  .content-info-last {
    display: flex;
    justify-content: space-between;
  }
  .time {
    font-size: 0.8em;
  }
`;

export const StContentInfoDiv = styled.div`
  display: flex;
  color: ${(props) => props.color};
  height: ${(props) => (props.top && !props.mypage ? "50px" : "auto")};
  margin-bottom: ${(props) =>
    props.top ? (props.mypage ? "15px" : "10px") : "0px"};
  font-size: ${(props) =>
    props.top ? (props.mypage ? "1em" : "1em") : "0.8em"};
  .front {
    margin-right: 20px;
  }
  .town {
    margin-bottom: 10px;
  }
`;

const StCategoryDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #92e3a9;
  width: 80px;
  height: 25px;
  text-align: center;
  margin-bottom: 10px;
  font-size: 0.8em;
`;

export const category = {
  1: "취미",
  2: "일상",
  3: "맛집",
  4: "동네소식",
  5: "사건,사고",
  6: "분실,실종",
  7: "질문",
  8: "반려동물",
  9: "육아",
  10: "기타",
};

export function timeForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}

export default function News({ news, mypage }) {
  return (
    <StNewsDiv mypage={mypage}>
      <Link to={`/news/read=${news.id}`}>
        <StContentsDiv>
          <StCategoryDiv>
            <div className={"category"}>{category[`${news.category}`]}</div>
          </StCategoryDiv>
          <StContentInfoDiv top mypage={mypage}>
            {news.content.length >= 30
              ? news.content.slice(0, 30) + "..."
              : news.content}
          </StContentInfoDiv>
          <StContentInfoDiv color={"#c4c4c4"}>
            <div className="front">{news.user.nickname}</div>
            <div className={"town"}>{news.user.town}</div>
          </StContentInfoDiv>
          <div className={"content-info-last"}>
            <StContentInfoDiv>
              <div className="front">조회수 {news.view}</div>
              <div>댓글 {news.comment_cnt}</div>
            </StContentInfoDiv>
            <div className={"time"}>{timeForToday(news.createdAt)}</div>
          </div>
        </StContentsDiv>
      </Link>
    </StNewsDiv>
  );
}
