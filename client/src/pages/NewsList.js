/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSearch,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import News from "./../components/News";
import Loading from "./../components/Loading";
import NoData from "./../components/NoData";
axios.defaults.withCredentials = true;

const StBodyDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-bottom: 200px;
  .category {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const StCategoryButton = styled.button`
  background: ${(props) => (props.select ? "#92E3A9" : "#EFEFEF")};
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #b7b7b7;
  width: 80px;
  height: 30px;
  margin: 20px;
  @media all and (max-width: 425px) {
    width: 80px;
    margin: 15px;
  }
`;

const StContentsHeadDiv = styled.div`
  margin: 10px 0 10px 0;
  width: 60%;
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
    font-size: 1.5em;
    svg {
      color: #92e3a9;
    }
    div {
      margin-left: 5px;
      font-weight: bold;
    }
  }
  .search {
    input {
      border: 1px solid gray;
      margin-right: 10px;
      border-radius: 10px;
      height: 20px;
    }
    svg {
      cursor: pointer;
    }
  }

  @media all and (max-width: 460px) {
    text-align: center;
    flex-direction: column;
    .myAddress {
      margin-bottom: 10px;
      font-size: 1em;
    }
    input {
      height: 15px;
    }
  }
`;

const StContentsBodyDiv = styled.div`
  width: 60%;
  @media all and (min-width: 1440px) {
    max-width: 990px;
  }
`;

export default function NewsList({ userinfo, login }) {
  const [newsList, setNewsList] = useState([]);
  const [category, setCategory] = useState({ number: 0 });
  const [page, setPage] = useState(1);
  const [loading, isLoading] = useState(true);
  const [fetch, isFetch] = useState(false);
  const inputSearchRef = useRef(null);
  const navigate = useNavigate();

  // 카테고리 변경하는 함수
  const changeCategory = (e) => {
    if (Number(e.target.value) === category.number) {
      inputSearchRef.current.value = "";
      setCategory({ ...category, number: 0 });
      navigate("/news=0");
    } else {
      inputSearchRef.current.value = "";
      setCategory({ ...category, number: Number(e.target.value) });
      navigate(`/news=${e.target.value}`);
    }
    setNewsList([]);
    setPage(1);
  };

  // 검색어에 따른 데이터 요청하는 함수
  const handleSearch = (e) => {
    if (
      inputSearchRef.current.value !== "" &&
      (e.key === "Enter" || e.type === "click")
    ) {
      if (category.number) {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/news/${category.number}?search=${inputSearchRef.current.value}&page=1`
          )
          .then((res) => {
            if (res.status === 204) {
              isLoading(false);
              setNewsList([]);
            } else {
              const mergeData = [].concat(...res.data.data);
              setNewsList(mergeData);
              setPage(2);
              isLoading(false);
              isFetch(false);
            }
          })
          .catch();
      } else {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/news?search=${inputSearchRef.current.value}&page=1`
          )
          .then((res) => {
            if (res.status === 204) {
              isLoading(false);
              setNewsList([]);
            } else {
              const mergeData = [].concat(...res.data.data);
              setNewsList(mergeData);
              setPage(2);
              isLoading(false);
              isFetch(false);
            }
          })
          .catch();
      }
    }
  };

  // 서버로 데이터를 요청하는 함수
  const requestNews = async () => {
    isLoading(true);
    isFetch(true);
    if (category.number) {
      if (inputSearchRef.current.value !== "") {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/news/${category.number}?search=${inputSearchRef.current.value}&page=${page}`
          )
          .then((res) => {
            if (res.status === 204) {
              isLoading(false);
            } else {
              const mergeData = newsList.concat(...res.data.data);
              setNewsList(mergeData);
              setPage((preState) => preState + 1);
              isLoading(false);
              isFetch(false);
            }
          })
          .catch();
      } else {
        await axios
          .get(
            `${process.env.REACT_APP_API_URL}/news/list/${category.number}?page=${page}`
          )
          .then((res) => {
            if (res.status === 204) {
              isLoading(false);
            } else {
              const mergeData = newsList.concat(...res.data.data);
              setNewsList(mergeData);
              setPage((preState) => preState + 1);
              isLoading(false);
              isFetch(false);
            }
          })
          .catch();
      }
    } else {
      if (inputSearchRef.current.value !== "") {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/news?search=${inputSearchRef.current.value}&page=${page}`
          )
          .then((res) => {
            if (res.status === 204) {
              isLoading(false);
            } else {
              const mergeData = newsList.concat(...res.data.data);
              setNewsList(mergeData);
              setPage((preState) => preState + 1);
              isLoading(false);
              isFetch(false);
            }
          })
          .catch();
      } else {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/news/list?page=${page}`)
          .then((res) => {
            console.log(res);
            if (res.status === 204) {
              isLoading(false);
            } else {
              const mergeData = newsList.concat(...res.data.data);
              setNewsList(mergeData);
              setPage((preState) => preState + 1);
              isLoading(false);
              isFetch(false);
            }
          })
          .catch();
      }
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
    if (userinfo.address === null) {
      navigate("/mypage");
    } else {
      navigate(`/news=${category.number}`);
      requestNews();
    }
  }, [userinfo, category]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

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
          반려동물
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
            <div className={"myAddress"}>
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              <div>{userinfo.town}</div>
            </div>
          ) : null}
          <div className={"search"}>
            <input
              type={"text"}
              placeholder={"검색"}
              ref={inputSearchRef}
              onKeyPress={(e) => handleSearch(e)}
            ></input>
            <FontAwesomeIcon
              icon={faSearch}
              onClick={(e) => handleSearch(e)}
            ></FontAwesomeIcon>
          </div>
        </StAddressSearchDiv>
        {login ? (
          <div class="write-post">
            <Link to="/news/write">
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
          <News mypage={false} news={news} key={index} />
        ))}
      </StContentsBodyDiv>
      {loading ? <Loading /> : null}
      {!loading && newsList.length === 0 ? <NoData /> : null}
    </StBodyDiv>
  );
}
