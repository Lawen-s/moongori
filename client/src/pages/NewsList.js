import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSearch,
  faPlusSquare,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import News from "./../components/News";
import Loading from "./../components/Loading";
import NoData from "./../components/NoData";
axios.defaults.withCredentials = true;

const StBodyDiv = styled.div`
  width: 100%;
  height: 100%;
  min-height: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-bottom: 40px;
  .category {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const StCategoryButton = styled.button`
  background: ${(props) => (props.select ? "#92E3A9" : "#EFEFEF")};
  cursor: pointer;
  border-radius: 10px;
  width: 100px;
  height: 30px;
  margin: 20px;
  @media all and (max-width: 425px) {
    width: 80px;
    margin: 15px;
  }
`;

const StContentsHeadDiv = styled.div`
  margin: 10px 0 10px 0;
  width: 70%;
  .write-post {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    width: 100%;
    .write-button {
      margin-top: 10px;
      color: #92e3a9;
      font-size: 1.5em;
    }
  }
  @media all and (min-width: 1440px) {
    max-width: 990px;
  }
`;

const StAddressSearchDiv = styled.div`
  display: flex;
  justify-content: ${(props) => (props.login ? "space-between" : "flex-end")};
  .myAddress {
    display: flex;
    svg {
      color: #92e3a9;
    }
    div {
      margin-left: 5px;
      font-weight: bold;
      font-size: 1.5em;
    }
  }
  input {
    border-radius: 10px;
    height: 20px;
  }
  @media all and (max-width: 425px) {
    .myAddress {
      svg {
        font-size: 1em;
      }
      div {
        font-size: 1em;
      }
    }
    input {
      height: 15px;
    }
  }
`;

const StContentsBodyDiv = styled.div`
  width: 70%;
  @media all and (min-width: 1440px) {
    max-width: 990px;
  }
`;

export default function NewsList({ userinfo, login }) {
  //! 해야하는 부분
  // 카테고리 선택하면 배경색 다르게 지정
  //? 서버에서 리스트에 대한 정보 받아오기 (조금씩 불러오기)
  //? map으로 뿌려주기
  //? 카테고리별로 게시글 받아와 뿌려주기
  //? 검색한 내용으로 게시글 받아와 뿌려주기
  //? 글쓰는 버튼 누르면 글쓰는 페이지로 이동하기 (로그인한 유저만)
  //? 게시글 하나 누르면 상세게시글페이지로 이동하기
  const [newsList, setNewsList] = useState([]);
  const [category, setCategory] = useState({ number: 0 });
  const [page, setPage] = useState(1);
  const [loading, isLoading] = useState(true);
  const [fetch, isFetch] = useState(false);
  const navigate = useNavigate();

  // 카테고리 변경하는 함수
  const changeCategory = (e) => {
    if (Number(e.target.value) === category.number) {
      setCategory({ ...category, number: 0 });
      navigate("/news=0");
    } else {
      setCategory({ ...category, number: Number(e.target.value) });
      navigate(`/news=${e.target.value}`);
    }
    setNewsList([]);
    setPage(1);
  };

  // 서버로 데이터를 요청하는 함수
  const requestNews = async () => {
    isLoading(true);
    isFetch(true);
    if (category.number) {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/news/list/${category.number}?page=${page}`
        )
        .then((res) => {
          const mergeData = newsList.concat(...res.data.data);
          setTimeout(() => {
            setNewsList(mergeData);
            setPage((preState) => preState + 1);
            isLoading(false);
            isFetch(false);
          }, 1000);
        })
        .catch();
    } else {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/news/list?page=${page}`)
        .then((res) => {
          const mergeData = newsList.concat(...res.data.data);
          setTimeout(() => {
            setNewsList(mergeData);
            setPage((preState) => preState + 1);
            isLoading(false);
            isFetch(false);
          }, 1000);
        })
        .catch();
    }
  };

  // 스크롤 이벤트 함수
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && !fetch) {
      requestNews();
    }
  };

  useEffect(() => {
    requestNews();
  }, [category]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const presentState = () => {
    console.log("newsList", newsList);
    console.log("category", category);
    console.log("page", page);
    console.log("loading", loading);
    console.log("fetch", fetch);
  };

  return (
    <StBodyDiv>
      <div className="category">
        <StCategoryButton
          value={1}
          onClick={(e) => changeCategory(e)}
          select={category.number === 1 ? true : false}
        >
          취미
        </StCategoryButton>
        <StCategoryButton
          value={2}
          onClick={(e) => changeCategory(e)}
          select={category.number === 2 ? true : false}
        >
          일상
        </StCategoryButton>
        <StCategoryButton
          value={3}
          onClick={(e) => changeCategory(e)}
          select={category.number === 3 ? true : false}
        >
          맛집
        </StCategoryButton>
        <StCategoryButton
          value={4}
          onClick={(e) => changeCategory(e)}
          select={category.number === 4 ? true : false}
        >
          동네소식
        </StCategoryButton>
        <StCategoryButton
          value={5}
          onClick={(e) => changeCategory(e)}
          select={category.number === 5 ? true : false}
        >
          사건,사고
        </StCategoryButton>
        <StCategoryButton
          value={6}
          onClick={(e) => changeCategory(e)}
          select={category.number === 6 ? true : false}
        >
          분실,실종
        </StCategoryButton>
        <StCategoryButton
          value={7}
          onClick={(e) => changeCategory(e)}
          select={category.number === 7 ? true : false}
        >
          질문
        </StCategoryButton>
        <StCategoryButton
          value={8}
          onClick={(e) => changeCategory(e)}
          select={category.number === 8 ? true : false}
        >
          일상
        </StCategoryButton>
        <StCategoryButton
          value={9}
          onClick={(e) => changeCategory(e)}
          select={category.number === 9 ? true : false}
        >
          육아
        </StCategoryButton>
        <StCategoryButton
          value={10}
          onClick={(e) => changeCategory(e)}
          select={category.number === 10 ? true : false}
        >
          기타
        </StCategoryButton>
      </div>
      <StContentsHeadDiv>
        <StAddressSearchDiv login={login}>
          {login ? (
            <div class="myAddress">
              <FontAwesomeIcon icon={faCheck} size={"2x"}></FontAwesomeIcon>
              <div>{userinfo.town.split(",")[1]}</div>
            </div>
          ) : null}
          <div>
            <input type={"text"} placeholder={"검색"}></input>
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </div>
        </StAddressSearchDiv>
        {login ? (
          <div class="write-post">
            <Link to="/">
              <FontAwesomeIcon
                className={"write-button"}
                icon={faPlusSquare}
              ></FontAwesomeIcon>
            </Link>
          </div>
        ) : null}
      </StContentsHeadDiv>
      <StContentsBodyDiv>
        {newsList.map((news, index) => (
          <News news={news} key={index} />
        ))}
      </StContentsBodyDiv>
      {loading ? <Loading /> : null}
      {!loading && newsList.length === 0 ? <NoData /> : null}
    </StBodyDiv>
  );
}
