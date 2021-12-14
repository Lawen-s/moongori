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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as rStar,
  faCamera,
  faMinusSquare,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import SimpleSlider from "../components/Slider";
import { tradeState } from "../components/Trade";
import { StContentsDiv, StPreviewDiv, StImageDiv } from "./TradePostWrite";

const StTradeBodyDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-bottom: 250px;
  .explain-wrap {
    max-width: 1000px;
    padding: ${(props) => (props.eidt ? "none" : "10px")};
    border-radius: 5px;
    /* border: ${(props) => (props.eidt ? "none" : "1px solid #b7b7b7")}; */
    width: 60%;
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
  max-width: 1000px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media all and (min-width: 2000px) {
    width: 50%;
    height: 500px;
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
margin-top:70px;
  width: 50%;
  height: 80%;
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
    align-items: center;
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
        font-size: 12px;
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
    border-bottom: 1px solid #b7b7b7;
    .trad-price {
      color: #b7b7b7;
      height: 30%;
    }
    .price {
      height: 70%;
      font-size: 35px;
      font-weight: bold;
    }
    .edit-price {
      width: 200px;
    }
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
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
    display: flex;
    justify-content: center;
    align-items: center;
    @media all and (max-width: 768px) {
      margin-bottom: 20px;
    }
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

//옵션 메뉴
const StOptionMenuUl = styled.ul`
  z-index: 4;
  background: #f2f2f2;
  list-style: none;
  border: 1px solid;
  width: 120px;
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

export default function TradeNoramlPost({ login, userinfo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(true);
  const [option, setOption] = useState(false);
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

  //상태 변경 요청할때 사용(예약중, 판매중, 판매완료);
  const [check, setCheck] = useState(null);

  //게시글 수정을 위한 변수
  const modifyTitle = useRef(null);
  const modifyCost = useRef(null);
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

  const openOption = () => {
    setOption(!option);
  };

  const changeState = async (s) => {
    await axios
      .patch(`${process.env.REACT_APP_API_URL}/trade/state/${id}`, {
        state: s,
      })
      .then((res) => {
        setCheck(res.data.data.state);
      });
  };

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
    const cost = modifyCost.current.value;
    if (
      title &&
      contents &&
      cost.length <= 8 &&
      imgFiles.length &&
      mainIdx !== null
    ) {
      const formData = new FormData();
      const copyImgFiles = imgFiles.filter((file) => file !== 1);
      for (let file of copyImgFiles) {
        formData.append("img", file);
      }
      formData.append("title", title);
      formData.append("sCost", cost);
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
    } else if (cost === "") {
      Swal.fire({
        icon: "error",
        title: "가격을 입력해주세요.",
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/trade/post/${id}`)
      .then((res) => {
        setCheck(res.data.data.postInfo.state);
        setPostInfo(res.data.data.postInfo);
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
                        check !== 3 ? (
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

                            {check === 1 ? (
                              <li
                                value={2}
                                onClick={() => {
                                  changeState(2);
                                }}
                              >
                                {tradeState[2]}으로 변경
                                <i class="fas fa-arrow-right"></i>
                              </li>
                            ) : (
                              <li
                                value={1}
                                onClick={() => {
                                  changeState(1);
                                }}
                              >
                                {tradeState[1]}으로 변경
                                <i class="fas fa-arrow-right"></i>
                              </li>
                            )}
                            <li
                              onClick={() => {
                                Swal.fire({
                                  title: "판매완료로 변경하시겠습니까?",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  cancelButtonText: "취소",
                                  confirmButtonText: "확인",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    changeState(3);
                                    Swal.fire("변경완료!", "");
                                  }
                                });
                              }}
                            >
                              {tradeState[3]}로 변경
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
                        ) : (
                          <StOptionMenuUl>
                            <li>
                              게시글 삭제
                              <i class="fas fa-arrow-right"></i>
                            </li>
                          </StOptionMenuUl>
                        )
                      ) : null
                    ) : null}
                    <div className={"now-state"}>
                      {check === 3
                        ? tradeState[3]
                        : check === 1
                          ? tradeState[1]
                          : tradeState[2]}
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
                  <div className={"trad-price"}>판매금액</div>
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
              <div className={"StContactButton"}>
                <SthandleButton>
                  <div>연락하기</div>
                </SthandleButton>
              </div>
            </StContentDiv>
          </StTradeBoxDiv>
          <div className={"explain-wrap"}>
            <div>
              {postInfo.content.split("\n").map((line) => {
                return (
                  <div>
                    {line}
                    <br />
                  </div>
                );
              })}
            </div>
          </div>
        </StTradeBodyDiv>
      ) : (
        //수정 상태
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
                    <div className={"guide-text"}>대표사진을 선택해주세요.</div>
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
                      {check === 3
                        ? tradeState[3]
                        : check === 1
                          ? tradeState[1]
                          : tradeState[2]}
                    </div>
                  </div>
                  <input
                    defaultValue={postInfo.title}
                    className={"edit-trade-title"}
                    ref={modifyTitle}
                  ></input>
                </div>
                <div className={"content-body"}>
                  <div className={"trad-price"}>판매금액</div>
                  <div style={{ color: "red" }}>최대 8자리까지 가능합니다.</div>
                  <input
                    type={"number"}
                    className={"edit-price"}
                    defaultValue={postInfo.sCost}
                    ref={modifyCost}
                  ></input>
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
                <SthandleButton>연락하기</SthandleButton>
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
      )}
    </>
  );
}

