/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  faEllipsisV,
  faWifi,
  faTimes,
  faStar as rStar,
  faPencilAlt,
  faCamera,
  faMinusSquare,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import SimpleSlider from "../components/Slider";
import { StContentInfoDiv } from "../components/News";
import { StContentsDiv, StPreviewDiv, StImageDiv } from "./TradePostWrite";
axios.defaults.withCredentials = true;

const StTradeBodyDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-bottom: 50px;
  .explain-wrap {
    padding: 10px;
    border-radius: 5px;
    /* border: ${(props) => (props.eidt ? "none" : "1px solid #b7b7b7")}; */
    width: 60%;
    max-width: 1000px;
    display: flex;
    align-items: center;
    @media all and (max-width: 768px) {
      width: 90%;
    }
    .trade-explain {
      border: none;
      resize: none;
      width: 100%;
      height: 200px;
    }
  }
  .cancle-check {
    width: 80%;
    display: flex;
    justify-content: flex-end;
  }
`;

const StTradeBoxDiv = styled.div`
  width: 60%;
  height: 500px;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media all and (min-width: 2000px) {
    width: 50%;
    height: 650px;
  }
  @media all and (max-width: 1024px) {
    width: 80%;
    height: 650px;
  }
  @media all and (max-width: 768px) {
    width: 100%;
    height: 1000px;
    display: flex;
    flex-direction: column;
  }
`;
const StPictureDiv = styled.div`
  width: 60%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media all and (max-width: 768px) {
    width: 90%;
    height: 50%;
  }
  .tradeImg {
    width: 80%;
    height: 70%;
  }
`;
const StContentDiv = styled.div`
margin-top:80px;
  margin-left: 20px;
  width: 40%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media all and (max-width: 768px) {
    width: 90%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .content-wrap {
    width: 100%;
    height: 100%;
    @media all and (max-width: 768px) {
      width: 90%;
    }
  }
  .content-head {
    margin-bottom: 10px;
    width: 100%;
    height: 15%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    .content-state-wrap {
      position: relative;
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      .option {
        color: #b7b7b7;
        cursor: pointer;
        @media all and (max-width: 1024px) {
          /* margin-right: 100px; */
        }
      }
      .now-state {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        border-radius: 10px;
        text-align: center;
        width: 53px;
        height: 20px;
        background: #aae8c5;
      }
    }

    .trade-title {
      height: 70%;
      font-size: 20px;
      font-weight: 700;
    }
    .edit-trade-title {
      width: 200px;
      height: 50%;
    }
  }
  .content-body {
    width: 100%;
    height: 30%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    .trad-price {
      color: #b7b7b7;
      height: 30%;
    }
    .price {
      border-bottom: 1px solid #b7b7b7;
      height: 70%;
      font-size: 35px;
      font-weight: 800;
    }
    .c-price {
      height: 70%;
      font-size: 35px;
      font-weight: 800;
    }
  }
  .content-tail {
    height: 40%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .nickname-box {
      height: 50%;
      display: flex;
      .profile-img {
        width: 10%;
        margin-right: 5px;
      }
      .image {
        height: 23px;
      }
      .nickname {
        margin-right: 20px;
        font-size: 17px;
      }
      .towninfo {
        font-size: 15px;
        color: #b7b7b7;
      }
    }
    .trade-info-box {
      height: 20%;
      display: flex;
      justify-content: space-between;
      .trade-cnt {
        font-size: 15px;
        margin-right: 10px;
        color: gray;
      }
      .trade-reliability {
        font-size: 15px;
        color: gray;
      }
    }
    .like-box {
      margin-top: 10px;
      height: 30%;
      display: flex;
      .like-star {
        margin-right: 10px;
      }
      .like-cnt {
        font-size: 16px;
      }
    }
  }
  .StContactButton {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: start;
    .contact {
      background: #aae8c5;
      border: 1px solid #b7b7b7;
      border-radius: 10px;
      width: 100%;
      height: 40px;
      @media all and (max-width: 768px) {
        width: 90%;
        height: 50px;
      }
    }
  }
`;
//옵션 메뉴
const StOptionMenuUl = styled.ul`
  z-index: 4;
  background: #f2f2f2;
  list-style: none;
  border: 1px solid;
  width: 100px;
  position: absolute;
  top: 0;
  right: 0;
  text-align: right;
  -webkit-padding-start: 0px;
  li {
    height: 25px;
    color: black;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9em;
    border-bottom: 1px solid;
    padding: 5px 3px 5px 3px;
  }
  li:hover {
    background: #aae8c5;
    cursor: pointer;
  }
  .lastli {
    border: none;
  }
  @media all and (max-width: 557px) {
    a,
    li {
      justify-content: center;
      i {
        display: none;
      }
    }
  }
`;

//댓글
const StCommentWrap = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  .comment-box {
    max-width: 1000px;
    border: 1px solid #b7b7b7;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
  }
`;
const StCommentInputDiv = styled.div`
  border-bottom: 1px solid gray;
  width: 90%;
  text-align: left;
  margin-top: 40px;
  .comment-cnt {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    font-size: 1.5em;
    margin-bottom: 10px;
    .comment-warning {
      font-size: 0.8em;
      color: red;
    }
    @media all and (max-width: 768px) {
      font-size: 1.2em;
    }
  }
  .input-button {
    display: flex;
    justify-content: end;
    /* align-items: center; */
    height: 60px;
    input {
      margin-top: 8px;
      margin-right: 5px;
      border: none;
      height: 30%;
      width: 20%;
      font-size: 1em;
    }
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    div {
      text-align: right;
      button {
        border-radius: 10px;
        border: 1px solid #b7b7b7;
        background: #92e3a9;
        height: 30px;
        margin: 3px 10px 0 0;
        width: 70px;
      }
    }
  }
`;
const StCommentListDiv = styled.div`
  margin-bottom: 30px;
  margin-top: 40px;
  width: 90%;
`;
const StPostHeaderDiv = styled.div`
  border-bottom: 1px solid;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 20px;
  .icon {
    padding: 10px 10px 0 0;
    font-size: 20px;
    @media all and (max-width: 540px) {
      font-size: 15px;
    }
    svg {
      cursor: pointer;
      margin-right: 10px;
    }
  }
`;
const StPostHeaderReUse = styled(StPostHeaderDiv)`
  border-bottom: 1px solid #c4c4c4;
  width: 95%;
  img {
    padding-top: 10px;
  }
  input {
    width: 300px;
    height: 20px;
    font-size: 1em;
    outline-color: #aae8c5;
  }
`;
const StPostUserDiv = styled.div`
  flex: 0.9 0 0;
  width: 200px;
  display: flex;
  align-items: center;
  img {
    height: 35px;
    width: 35px;
    margin: 10px 10px 0 0;
    @media all and (max-width: 540px) {
      height: 30px;
      width: 30px;
    }
  }
  .info {
    margin: 10px 10px 0 0;
    text-align: left;
    font-size: 0.8em;
    span {
      margin: 0 10px 5px 0;
    }
  }
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
const StCommentButtonDiv = styled.div`
  padding: 30px 0 0 30px;
  text-align: right;
  button {
    border-radius: 30px;
    background: #92e3a9;
    height: 30px;
    margin-right: 10px;
    width: 70px;
    cursor: pointer;
  }
`;

const SthandleButton = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
      background: #aae8c5;
      border: 1px solid #b7b7b7;
      border-radius: 10px;
      width: ${(props) => (props.modify ? "80px" : "100%")};
      height: ${(props) => (props.modify ? "30px" : "40px")};
      margin-right: ${(props) => (props.modify ? "10px" : "none")};
      margin-top:${(props) => (props.modify ? "10px" : "none")};
      cursor: pointer;
      @media all and (max-width: 768px) {
        width: 90%;
        height: 50px;
      }
    }
`;

export function endForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);
  const betweenTime = Math.floor(
    (timeValue.getTime() - today.getTime()) / 1000 / 60
  );
  if (betweenTime < 60) {
    return `곧 마감`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `H - ${betweenTimeHour}시간`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `D - ${betweenTimeDay}일`;
  }
}
export default function TradeSuggestionPost({ login, userinfo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(true);
  const [priceList, setPriceList] = useState([]);
  const [option, setOption] = useState(false);
  const [priceId, setPriceId] = useState(null);
  const inputPriceRef = useRef(null);
  const inputRevisedPriceRef = useRef(null);
  const [postInfo, setPostInfo] = useState({
    title: "",
    sCost: "",
    img: "",
    user: {
      img: "",
      nickname: "",
      town: "",
    },
    likes_cnt: 0,
    content: "",
  });
  const [likeState, setLikeState] = useState(false);
  const [cCost, setCCost] = useState(0);

  const openOption = () => {
    setOption(!option);
  };

  //게시글 수정을 위한 변수
  const modifyTitle = useRef(null);
  const modifyContent = useRef(null);
  const [imgFiles, setImgFiles] = useState([]); // 서버에 보내는 이미지 파일
  const [images, setImages] = useState([]); // 화면에 표현해주는 이미지
  const [mainIdx, setMainIdx] = useState(null); // 대표사진 index
  const [modifyIdx, setModifyIdx] = useState([]); // 수정사진 index

  // 사진 업로드하는 경우
  const handleUploadImg = (e) => {
    if (imgFiles.length + e.target.files.length <= 5) {
      const file = [];
      const imgUrl = [];
      let count = 0;
      for (let key in e.target.files) {
        if (count === e.target.files.length) break;
        file.push(e.target.files[key]);
        imgUrl.push(URL.createObjectURL(e.target.files[key]));
        count++;
      }
      setImgFiles([...imgFiles, ...file]);
      setImages([...images, ...imgUrl]);
    } else {
      Swal.fire({
        icon: "error",
        title: "상품이미지는 최대5까지 가능합니다.",
      });
    }
  };

  // 대표사진 클릭하는 경우
  const handleMainImg = (index) => {
    setMainIdx(index);
  };

  // 업로드할 사진 삭제하는 경우
  const handelDeleteImg = (index) => {
    // 기존의 사진이 삭제된 경우
    if (index < postInfo.img.split(",").length) {
      setModifyIdx([...modifyIdx, index]);
    }
    const copyImages = images.slice();
    const copyImgFiles = imgFiles.slice();
    copyImgFiles.splice(index, 1);
    copyImages.splice(index, 1);
    setImgFiles(copyImgFiles);
    setImages(copyImages);
    if (index === mainIdx) {
      setMainIdx(null);
    } else if (index < mainIdx) {
      setMainIdx((preState) => preState - 1);
    }
  };

  // 찜하기
  const like = async () => {
    if (likeState) {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/trade/like`, {
          data: { tradePost_Id: id },
        })
        .then((res) => {
          setPostInfo({ ...postInfo, likes_cnt: postInfo.likes_cnt - 1 });
          setLikeState(false);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "로그인 후 이용가능합니다",
            text: "",
            footer: "",
          });
        });
    } else {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/trade/like`, {
          tradePost_Id: id,
        })
        .then((res) => {
          setPostInfo({ ...postInfo, likes_cnt: postInfo.likes_cnt + 1 });
          setLikeState(true);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "로그인 후 이용가능합니다",
            text: "",
            footer: "",
          });
        });
    }
  };

  //내용을 수정하는 함수
  const modifyPost = () => {
    const title = modifyTitle.current.value;
    const contents = modifyContent.current.value;

    if (title && contents && imgFiles.length && mainIdx !== null) {
      const formData = new FormData();
      const copyImgFiles = imgFiles.filter((file) => file !== 1);
      for (let file of copyImgFiles) {
        formData.append("img", file);
      }
      formData.append("title", title);
      formData.append("content", contents);
      formData.append("mainIdx", mainIdx);
      for (let idx of modifyIdx.sort((a, b) => b - a)) {
        formData.append("modifyIdx", idx);
      }
      const config = {
        Headers: {
          "content-type": "multipart/form-data",
        },
      };
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/trade/normal/${id}`,
          formData,
          config
        )
        .then((res) => {
          setPostInfo({
            ...postInfo,
            img: res.data.data.img,
            title: res.data.data.title,
            content: res.data.data.content,
            sCost: res.data.data.sCost,
          });
          setEdit(true);
        });
    } else if (title === "") {
      Swal.fire({
        icon: "error",
        title: "제목을 입력해주세요.",
      });
    } else if (!imgFiles.length) {
      Swal.fire({
        icon: "error",
        title: "상품 이미지를 올려주세요.",
      });
    } else if (mainIdx === null) {
      Swal.fire({
        icon: "error",
        title: "대표 사진을 선택해주세요.",
      });
    } else if (contents === "") {
      Swal.fire({
        icon: "error",
        title: "설명을 확인해주세요.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "가격은 8자리까지 가능합니다.",
      });
    }
  };
  //내용을 삭제하는 함수
  const deletePost = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/trade/post/${id}`)
      .then((res) => {
        navigate("/trade=all");
      });
  };

  // 서버에 금액을 추가하는 함수
  const registerComment = () => {
    if (login) {
      if (inputPriceRef.current.value >= postInfo.sCost) {
        if (inputPriceRef.current.value.length <= 8) {
          axios
            .post(`${process.env.REACT_APP_API_URL}/trade/suggestion`, {
              tradePost_Id: id,
              cost: inputPriceRef.current.value,
            })
            .then((res) => {
              setPriceList([
                {
                  ...res.data.data.createSuggestion,
                  user: {
                    img: userinfo.img,
                    nickname: userinfo.nickname,
                    town: userinfo.town,
                  },
                },
                ...priceList,
              ]);
              setCCost(res.data.data.currentCost);
            })
            .catch();
          inputPriceRef.current.focus();
          inputPriceRef.current.value = "";
        } else {
          Swal.fire({
            icon: "error",
            title: "최대 8자리까지 가능합니다.",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "현재금액보다 높게 제시해주세요.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요한 기능입니다.",
      });
    }
  };
  // 금액 수정 아이콘을 눌렀을 때 실행하는 함수
  const handleRevise = (price_id) => {
    setPriceId(price_id);
  };

  // 금액 수정하는 함수
  const reviseComment = (price_id) => {
    if (
      inputRevisedPriceRef.current.value >= postInfo.sCost &&
      inputRevisedPriceRef.current.value.length <= 8
    ) {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/trade/suggestion/${price_id}`,
          {
            tradePost_Id: id,
            cost: inputRevisedPriceRef.current.value,
          }
        )
        .then((res) => {
          setPriceList([...res.data.data.updateSuggestion].reverse());
          setCCost(res.data.data.currentCost);
          setPriceId(null);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "제시 금액을 확인해주세요.",
      });
    }
  };
  // 금액 삭제하는 함수
  const deleteComment = (price_id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/trade/suggestion/${price_id}`, {
        data: { tradePost_Id: id },
      })
      .then((res) => {
        setPriceList([...res.data.data.list].reverse());
        setCCost(res.data.data.currentCost);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/trade/post/${id}`)
      .then((res) => {
        setCCost(res.data.data.postInfo.cCost);
        setPostInfo(res.data.data.postInfo);
        setPriceList(res.data.data.postInfo.suggestions.reverse());
        // 이미지파일과 미리보기이미지는 배열의 길이를 같게 유지해야함
        setImages([...res.data.data.postInfo.img.split(",")]);
        setImgFiles(
          new Array([...res.data.data.postInfo.img.split(",")].length).fill(1)
        );
        res.data.data.postInfo.likes.map((el) => {
          if (login) {
            if (el.user_Id === userinfo.id) {
              setLikeState(true);
            }
          }
        });
      });
  }, [login]);

  return (
    <>
      {edit ? (
        //기본 상태
        <>
          <StTradeBodyDiv>
            <StTradeBoxDiv>
              <StPictureDiv>
                <SimpleSlider img={postInfo.img} />
              </StPictureDiv>
              <StContentDiv>
                <div className={"content-wrap"}>
                  <div className={"content-head"}>
                    <div className={"content-state-wrap"}>
                      {edit ? (
                        option ? (
                          <StOptionMenuUl>
                            <li
                              onClick={() => {
                                setEdit(false);
                                setOption(false);
                              }}
                            >
                              게시글 수정
                              <i class="fas fa-arrow-right"></i>
                            </li>
                            <li
                              onClick={() => {
                                deletePost();
                              }}
                            >
                              게시글 삭제
                              <i class="fas fa-arrow-right"></i>
                            </li>
                          </StOptionMenuUl>
                        ) : null
                      ) : null}
                      <div className={"now-state"}>
                        {endForToday(postInfo.endDate)}
                      </div>
                      {userinfo.id === postInfo.user_Id ? (
                        option ? (
                          <FontAwesomeIcon
                            icon={faTimes}
                            className={"option"}
                            onClick={() => openOption()}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faEllipsisV}
                            className={"option"}
                            onClick={() => openOption()}
                          />
                        )
                      ) : null}
                    </div>
                    <div className={"trade-title"}>{postInfo.title}</div>
                  </div>
                  <div className={"content-body"}>
                    <div className={"trad-price"}>제시금액</div>
                    <div className={"price"}>
                      {postInfo.sCost.toLocaleString()} 원
                    </div>
                  </div>
                  <div className={"content-tail"}>
                    <div className={"nickname-box"}>
                      <div className={"profile-img"}>
                        <img
                          src={postInfo.user.img}
                          className={"image"}
                          alt={"유저 이미지"}
                        ></img>
                      </div>
                      <div className={"nickname"}>{postInfo.user.nickname}</div>
                      <div className={"towninfo"}>{postInfo.user.town}</div>
                    </div>
                    <div className={"trade-info-box"}>
                      <div className={"trade-cnt"}>판매 103</div>
                      <div className={"trade-reliability"}>
                        거래안정도 <FontAwesomeIcon icon={faWifi} />
                      </div>
                    </div>
                    <div className={"like-box"}>
                      <div className={"like-star"}>
                        {likeState ? (
                          <FontAwesomeIcon icon={rStar} onClick={like} />
                        ) : (
                          <FontAwesomeIcon icon={faStar} onClick={like} />
                        )}
                      </div>
                      <div className={"like-cnt"}>찜 {postInfo.likes_cnt}</div>
                    </div>
                  </div>
                </div>
                <div className={"content-body"}>
                  <div className={"trad-price"}>현재금액</div>
                  <div className={"c-price"}>{Number(cCost).toLocaleString()} 원</div>
                </div>
              </StContentDiv>
            </StTradeBoxDiv>
            <div className={"explain-wrap"}>
              <div className={"trade-explain"}>
                {/* 본문 */}
                {postInfo.content}
              </div>
            </div>
          </StTradeBodyDiv>
          <StCommentWrap>
            <div className={"comment-box"}>
              <StCommentInputDiv>
                <div className="comment-cnt">
                  <div>제시 금액 {priceList.length}</div>
                  <div className={"comment-warning"}>
                    {postInfo.state === 4
                      ? `${postInfo.sCost.toLocaleString()}원 보다 높게 제시해주세요.`
                      : "마감되었습니다."}
                  </div>
                </div>
                {postInfo.state === 4 ? (
                  <div className="input-button">
                    <input
                      type={"number"}
                      placeholder={"금액 제시"}
                      ref={inputPriceRef}
                    ></input>
                    <div>
                      <button type={"button"} onClick={registerComment}>
                        등 록
                      </button>
                    </div>
                  </div>
                ) : null}
              </StCommentInputDiv>
              <StCommentListDiv>
                {priceList.map((price, index) => (
                  <StPostHeaderReUse key={index}>
                    <StPostUserDiv>
                      <img src={price.user.img} alt="프로필사진"></img>
                      <div className={"info"}>
                        <StContentInfoDiv>
                          <span>{price.user.nickname}</span>
                          <span style={{ color: "gray" }}>
                            {price.user.town}
                          </span>
                        </StContentInfoDiv>
                        {price.id === priceId ? (
                          <input
                            type={"number"}
                            defaultValue={price.cost}
                            ref={inputRevisedPriceRef}
                          />
                        ) : (
                          <div>{Number(price.cost).toLocaleString()}원</div>
                        )}
                      </div>
                    </StPostUserDiv>
                    {login && userinfo.id === price.user_Id ? (
                      price.id === priceId ? (
                        <StCommentButtonDiv>
                          <button
                            type={"button"}
                            onClick={() => setPriceId(null)}
                          >
                            취소
                          </button>
                          <button onClick={() => reviseComment(price.id)}>
                            확인
                          </button>
                        </StCommentButtonDiv>
                      ) : (
                        <div className={"icon"}>
                          <FontAwesomeIcon
                            icon={faPencilAlt}
                            onClick={() => handleRevise(price.id)}
                          />
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            onClick={() => deleteComment(price.id)}
                          />
                        </div>
                      )
                    ) : null}
                  </StPostHeaderReUse>
                ))}
              </StCommentListDiv>
            </div>
          </StCommentWrap>
        </>
      ) : (
        //수정 상태
        <>
          <StTradeBodyDiv>
            <StTradeBoxDiv>
              <StPictureDiv>
                <StContentsDiv>
                  <div>
                    <label for="uploadImg">
                      <div className={"image-upload"}>
                        <FontAwesomeIcon icon={faCamera} />
                        <div>{`${imgFiles.length} / 5`}</div>
                      </div>
                    </label>
                    {imgFiles.length ? (
                      <div className={"guide-text"}>
                        대표사진을 선택해주세요.
                      </div>
                    ) : null}
                    <input
                      type="file"
                      name="file"
                      multiple
                      id="uploadImg"
                      accept="image/*"
                      onChange={(e) => handleUploadImg(e)}
                      style={{ display: "none" }}
                    />
                    <StPreviewDiv>
                      {images.map((image, index) => {
                        return (
                          <StImageDiv key={index} select={mainIdx === index}>
                            <FontAwesomeIcon
                              icon={faMinusSquare}
                              pull={"left"}
                              onClick={() => handelDeleteImg(index)}
                            />
                            <img
                              src={image}
                              alt={"미리보기 이미지"}
                              onClick={() => handleMainImg(index)}
                            />
                            {mainIdx === index ? (
                              <FontAwesomeIcon
                                className={"select-img"}
                                icon={faCheck}
                              />
                            ) : null}
                          </StImageDiv>
                        );
                      })}
                    </StPreviewDiv>
                  </div>
                </StContentsDiv>
              </StPictureDiv>
              <StContentDiv>
                <div className={"content-wrap"}>
                  <div className={"content-head"}>
                    <div className={"content-state-wrap"}>
                      <div className={"now-state"}>
                        {endForToday(postInfo.endDate)}
                      </div>
                    </div>
                    <input
                      defaultValue={postInfo.title}
                      className={"edit-trade-title "}
                      ref={modifyTitle}
                    ></input>
                  </div>
                  <div className={"content-body"}>
                    <div className={"trad-price"}>제시금액</div>
                    <div className={"price"}>
                      {postInfo.sCost.toLocaleString()}원
                    </div>
                  </div>
                  <div className={"content-tail"}>
                    <div className={"nickname-box"}>
                      <div className={"profile-img"}>
                        <img
                          src={postInfo.user.img}
                          className={"image"}
                          alt={"유저 이미지"}
                        ></img>
                      </div>
                      <div className={"nickname"}>{postInfo.user.nickname}</div>
                      <div className={"towninfo"}>{postInfo.user.town}</div>
                    </div>
                    <div className={"trade-info-box"}>
                      <div className={"trade-cnt"}>판매 103</div>
                      <div className={"trade-reliability"}>
                        거래안정도 <FontAwesomeIcon icon={faWifi} />
                      </div>
                    </div>
                    <div className={"like-box"}>
                      <div className={"like-star"}>
                        <FontAwesomeIcon icon={faStar} />
                      </div>
                      <div className={"like-cnt"}>찜 {postInfo.likes_cnt}</div>
                    </div>
                  </div>
                </div>
                <div className={"StContactButton"}>
                  <button className={"contact"}>연락하기</button>
                </div>
              </StContentDiv>
            </StTradeBoxDiv>
            <div edit className={"explain-wrap"}>
              <textarea
                className={"trade-explain"}
                defaultValue={postInfo.content}
                ref={modifyContent}
              ></textarea>
            </div>
            <div className={"cancle-check"}>
              <SthandleButton modify onClick={() => setEdit(true)}>
                <div>취소</div>
              </SthandleButton>
              <SthandleButton modify onClick={modifyPost}>
                <div>완료</div>
              </SthandleButton>
            </div>
          </StTradeBodyDiv>
        </>
      )}
    </>
  );
}
