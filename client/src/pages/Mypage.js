import React from "react";
import { useState } from "react";

import styled from "styled-components";
import PasswordModal from "../components/PasswordModal";
import WithdrawalModal from "../components/WithdrawalModal";
import axios from "axios";
import lock from "../images/locked.png";
import cancel from "../images/cancel.png";
import editImg from "../images/edit.png";
import complete from "../images/complete.png";
import Swal from "sweetalert2";
import DaumPostcode from "react-daum-postcode";

const ModalBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;
const StMypageHead = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .mypage-master {
    height: 800px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .mypage-box {
    width: 40%;
    height: 60%;
    background-color: #aae8c5;
    border-radius: 15px;
    @media all and (max-width: 768px) {
      width: 90%;
      height: 50%;
    }

    .mypage-wrap {
      width: 100%;
      height: 80%;
      display: flex;
      justify-content: center;
      @media all and (max-width: 768px) {
        height: 70%;
      }
      .mypage-profile-box {
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .profile-img {
          width: 60%;
          height: 45%;
          border-radius: 70%;
          overflow: hidden;
        }
      }
      .mypage-userinfo-box {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .edit-wrap {
          margin-right: 42px;
          width: 100%;
          height: 10%;
          display: flex;
          align-items: center;
          justify-content: end;
          .edit-img {
            width: 20px;
            height: 20px;
          }
          @media all and (max-width: 768px) {
            margin-right: 82px;
            margin-top: 5px;
          }
        }
        .mypage-userinfo-wrap {
          height: 80%;
          width: 100%;
          @media all and (max-width: 768px) {
            height: 90%;
          }
        }
        .mypage-input-box {
          width: 100%;
          height: 30%;
          display: flex;
          justify-content: center;
          align-items: center;
          @media all and (max-width: 768px) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .input-title {
            text-align: center;
            width: 30%;
            font-size: 16px;
            @media all and (max-width: 768px) {
              text-align: center;
              font-size: 12px;
              margin-bottom: 5px;
            }
          }
          .input-tick {
            width: 80%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            @media all and (max-width: 768px) {
              height: 60%;
              display: flex;
              align-items: start;
            }
            .input-area {
              display: flex;
              align-items: center;
              justify-content: center;
              background: white;
              height: 30%;
              width: 80%;
              border-radius: 5px;
              border: 1px gray;
              @media all and (max-width: 768px) {
                height: 50%;
              }
              .userinfo-contents {
                font-size: 12px;
                @media all and (max-width: 768px) {
                  font-size: 9px;
                }
              }
            }
            .edit {
              width: 50%;
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
              text-align: center;
              @media all and (max-width: 768px) {
                font-size: 9px;
              }
            }
            .dupicate-wrap {
              width: 30%;
              height: 32%;
              @media all and (max-width: 768px) {
                height: 55%;
              }
              .dupicate-button {
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px gray;
                background: #d9f9e7;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                width: 100%;
                height: 100%;
                .dupicate-check {
                  font-weight: bold;
                  font-size: 10px;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }
  .button-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media all and (max-width: 768px) {
      height: 30%;
    }
    .button-box-empty {
      width: 40%;
      @media all and (max-width: 768px) {
        width: 0%;
      }
    }
    .button-box {
      width: 60%;
      height: 100%;
      display: flex;
      justify-content: center;
      border: 1px gray;
      @media all and (max-width: 768px) {
        height: 100%;
        align-items: center;
      }
      .button-area {
        width: 50%;
        display: flex;
        justify-content: center;
        @media all and (max-width: 768px) {
          height: 50%;
        }
        .button-icon {
          width: 12px;
          height: 12px;
          margin-right: 2px;
        }
        .request-button {
          cursor: pointer;
          font-size: 13px;
          color: gray;
        }
      }
    }
  }
  .mypage-category {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .category-wrap {
      width: 62%;
      height: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      @media all and (max-width: 768px) {
        height: 40%;
        width: 100%;
      }
      .category-box {
        margin-top: 20px;
        height: 100%;
        width: 70%;
        border-top: solid 1px #b7b7b7;
        border-bottom: solid 1px #b7b7b7;
        display: flex;
        justify-content: center;
        align-items: center;
        @media all and (max-width: 768px) {
          width: 90%;
        }
        .category-align {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          @media all and (max-width: 768px) {
            flex-direction: column;
          }
          .category-half {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 60%;
            @media all and (max-width: 768px) {
              width: 70%;
            }
          }
          .category-tick {
            height: 100%;
            width: 33.3%;
            display: flex;
            justify-content: center;
            align-items: center;
            /* .category-button {
              font-size: 9px;
              width: 80%;
              height: 60%;
              /* background: #d1d1d1; */
              border-radius: 15px;
              border: 1px gray;
              cursor: pointer;
              &:focus {
                background: #aae8c5;
              }
              @media all and (max-width: 768px) {
                height: 70%;
                width: 90%;
                font-size: 6px;
              }
            } */
          }
        }
      }
    }

    .content-head {
      width: 100%;
      height: 60%;
      display: flex;
      align-items: center;
      justify-content: center;
      .content-wrap {
        margin-top: 30px;
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        @media all and (max-width: 768px) {
          width: 90%;
        }
      }
    }
  }
`;
const StContent = styled.div`
  background: white;
  width: 60%;
  height: 100px;
  border-radius: 15px;
  border: 1px solid #aae8c5;
  @media all and (max-width: 768px) {
    width: 90%;
  }
  &:hover {
    cursor: pointer;
    box-shadow: gray 3px 3px 3px;
  }
  &:active {
    box-shadow: none;
  }
  .title-tick {
    width: 100%;
    height: 25%;
    margin-top: 2px;
    margin-left: 5px;
    .title {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      font-weight: bold;
      border-radius: 15px;
      background: #aae8c5;
      width: 50px;
      height: 100%;
    }
  }
  .content-tick {
    height: 35%;
    width: 100%;
    margin-left: 10px;
    .content {
      font-size: 11px;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
  .address-tick {
    height: 20%;
    width: 100%;
    display: flex;
    margin-left: 10px;
    .address-area {
      font-size: 9px;
      color: gray;
      display: flex;
      width: 50%;
      .nickname {
        margin-right: 5px;
      }
    }
    .data-area {
      font-size: 9px;
      color: gray;
      width: 50%;
      display: flex;
      justify-content: end;
      margin-right: 20px;
    }
  }
  .comment-tick {
    height: 20%;
    width: 100%;
    display: flex;
    margin-left: 10px;
    .comment-area {
      display: flex;
      font-size: 9px;
      color: gray;
      .views {
        margin-right: 5px;
      }
    }
  }
`;

const StCategoryButton = styled.button.attrs((props) => ({
  type: "button",
}))`
  background: ${(props) => (props.select ? "#92E3A9" : "#EFEFEF")};
  font-size: 9px;
  width: 80%;
  height: 60%;
  border-radius: 15px;
  border: 1px gray;
  cursor: pointer;
  @media all and (max-width: 768px) {
    height: 70%;
    width: 90%;
    font-size: 6px;
  }
`;

export default function Mypage({ login, userinfo }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [category, setCategory] = useState({ number: null });
  const [edit, setEdit] = useState(true);
  const [editInfo, setEditInfo] = useState({
    img: userinfo.img,
    nickname: userinfo.nickname,
    address: userinfo.address,
    town: userinfo.town,
  });
  const [duplicate, setDuplicate] = useState({
    nickname: false,
  });
  const [openPost, isOpenPost] = useState(false);
  const handleInputValue = (key) => (e) => {
    setEditInfo({ ...editInfo, [key]: e.target.value });
  };

  console.log(editInfo);
  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };
  const modalClose2 = () => {
    setModalOpen2(!modalOpen2);
  };
  const modalClose3 = () => {
    isOpenPost(!openPost);
  };
  const editHandler = () => {
    setEdit(!edit);
  };
  // useEffect(() => {
  //   if (!userinfo.address) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "원활한 서비스 이용을 위해 동네 인증을 해주세요",
  //       text: "",
  //       footer: "",
  //     });
  //   }
  // }, []);
  const checkDuplicate = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/nickname`, {
        nickname: editInfo.nickname,
      })
      .then((res) => {
        setDuplicate(true);

        Swal.fire({
          icon: "success",
          title: "사용 가능한 닉네임입니다",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "중복된 닉네임입니다",
          text: "",
          footer: "",
        });
      });
  };
  //수정 요청
  const submitEditInfo = () => {
    if (duplicate === true) {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/user`, {
          nickname: editInfo.nickname,
          address: editInfo.address,
        })
        .then((res) => {
          setEdit(true);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "닉네임 중복 확인을 해주세요",
        text: "",
        footer: "",
      });
    }
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      if (data.sigungu !== "") {
        extraAddr += `, ${data.sigungu}`;
      }
      if (data.bname !== "") {
        extraAddr += `, ${data.bname}`;
      }
      fullAddr += extraAddr !== "" ? ` ${extraAddr}` : "";
    }
    setEditInfo({ ...editInfo, ["address"]: fullAddr });
    isOpenPost(false);
  };
  const postCodeStyle = {
    display: "block",
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "400px",
    height: "400px",
    transform: "translate(-50%, -50%)",
    padding: "7px",
  };

  const postThemeStyle = {
    bgColor: "#D6FFEA",
    outlineColor: "#222222",
  };

  // 카테고리 변경하는 함수
  const changeCategory = (e) => {
    setCategory({ ...category, number: Number(e.target.value) });
  };

  return (
    <StMypageHead>
      <div className={"mypage-master"}>
        <div className={"mypage-box"}>
          {edit ? (
            //기존 상태
            <div className={"mypage-wrap"}>
              <div className={"mypage-profile-box"}>
                <img src={editInfo.img} className={"profile-img"}></img>
              </div>
              <div className={"mypage-userinfo-box"}>
                <div className={"edit-wrap"}>
                  <div className={"edit-box"}>
                    <img
                      src={editImg}
                      className={"edit-img"}
                      onClick={() => {
                        editHandler();
                      }}
                    ></img>
                  </div>
                </div>
                <div className={"mypage-userinfo-wrap"}>
                  <div className={"mypage-input-box"}>
                    <div className={"input-title"}>닉네임</div>
                    <div className={"input-tick"}>
                      {/* <input
                    type="text"
                    className={"input-area"}
                      defaultValue={userinfo.email}
                  ></input> */}
                      <div className={"input-area"}>
                        <div className={"userinfo-contents"}>
                          {editInfo.nickname}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"mypage-input-box"}>
                    <div className={"input-title"}>이메일</div>
                    <div className={"input-tick"}>
                      {/* <input
                    type="text"
                    className={"input-area"}
                    defaultValue={userinfo.email}
                  ></input> */}
                      <div className={"input-area"}>
                        <div className={"userinfo-contents"}>
                          {userinfo.email}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"mypage-input-box"}>
                    <div className={"input-title"}>동네</div>
                    <div className={"input-tick"}>
                      {/* <input
                    type="text"
                    className={"input-area"}
                    defaultValue={userinfo.address}
                  ></input> */}
                      <div className={"input-area"}>
                        <div className={"userinfo-contents"}>
                          {editInfo.address}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            //편집 상태
            <div className={"mypage-wrap"}>
              <div className={"mypage-profile-box"}>
                <img src={editInfo.img} className={"profile-img"}></img>
                <button>사진 변경</button>
              </div>
              <div className={"mypage-userinfo-box"}>
                <div className={"edit-wrap"}>
                  <div className={"edit-box"}>
                    <img
                      src={complete}
                      className={"edit-img"}
                      onClick={() => {
                        editHandler();
                        submitEditInfo();
                      }}
                    ></img>
                  </div>
                </div>
                <div className={"mypage-userinfo-wrap"}>
                  <div className={"mypage-input-box"}>
                    <div className={"input-title"}>닉네임</div>
                    <div className={"input-tick"}>
                      <input
                        type="text"
                        className={"input-area edit"}
                        defaultValue={editInfo.nickname}
                        onChange={handleInputValue("nickname")}
                      ></input>
                      <div className={"dupicate-wrap"}>
                        <div className={"dupicate-button"}>
                          <div
                            className={"dupicate-check"}
                            onClick={() => checkDuplicate()}
                          >
                            중복 확인
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"mypage-input-box"}>
                    <div className={"input-title"}>이메일</div>
                    <div className={"input-tick"}>
                      <div className={"input-area"}>
                        <div className={"userinfo-contents"}>
                          {userinfo.email}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"mypage-input-box"}>
                    <div className={"input-title"}>동네</div>
                    <div className={"input-tick"}>
                      <input
                        className={"input-area"}
                        value={editInfo.address}
                        onFocus={() => isOpenPost(true)}
                      ></input>
                      {openPost && (
                        <ModalBackground onClick={() => modalClose3()}>
                          <DaumPostcode
                            style={postCodeStyle}
                            theme={postThemeStyle}
                            autoClose
                            onComplete={onCompletePost}
                          />
                        </ModalBackground>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={"button-wrap"}>
            <div className={"button-box-empty"}></div>
            <div className={"button-box"}>
              <div className={"button-area"}>
                <img src={lock} className={"button-icon"}></img>
                <div onClick={modalClose} className={"request-button"}>
                  비밀번호 변경
                </div>
                {modalOpen && (
                  <PasswordModal modalClose={modalClose}></PasswordModal>
                )}
              </div>
              <div className={"button-area"}>
                <img src={cancel} className={"button-icon"}></img>
                <div onClick={modalClose2} className={"request-button"}>
                  회원탈퇴
                </div>
                {modalOpen2 && (
                  <WithdrawalModal modalClose2={modalClose2}></WithdrawalModal>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={"mypage-category"}>
          <div className={"category-wrap"}>
            <div className={"category-box"}>
              <div className={"category-align"}>
                <div className={"category-half"}>
                  <div className={"category-tick"}>
                    <StCategoryButton
                      value={1}
                      onClick={(e) => changeCategory(e)}
                      select={category.number === 1 ? true : false}
                    >
                      내 게시글
                    </StCategoryButton>
                  </div>
                  <div className={"category-tick"}>
                    <StCategoryButton
                      value={2}
                      onClick={(e) => changeCategory(e)}
                      select={category.number === 2 ? true : false}
                    >
                      내 동네소식
                    </StCategoryButton>
                  </div>
                  <div className={"category-tick"}>
                    <StCategoryButton
                      value={3}
                      onClick={(e) => changeCategory(e)}
                      select={category.number === 3 ? true : false}
                    >
                      판매내역
                    </StCategoryButton>
                  </div>
                </div>
                <div className={"category-half"}>
                  <div className={"category-tick"}>
                    <StCategoryButton
                      value={4}
                      onClick={(e) => changeCategory(e)}
                      select={category.number === 4 ? true : false}
                    >
                      구매내역
                    </StCategoryButton>
                  </div>
                  <div className={"category-tick"}>
                    <StCategoryButton
                      value={5}
                      onClick={(e) => changeCategory(e)}
                      select={category.number === 5 ? true : false}
                    >
                      찜한 게시글
                    </StCategoryButton>
                  </div>
                  <div className={"category-tick"}>
                    <StCategoryButton
                      value={6}
                      onClick={(e) => changeCategory(e)}
                      select={category.number === 6 ? true : false}
                    >
                      관심 소식
                    </StCategoryButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"content-head"}>
            <div className={"content-wrap"}>
              <StContent>
                <div className={"title-tick"}>
                  <div className={"title"}>
                    <div>질문</div>
                  </div>
                </div>
                <div className={"content-tick"}>
                  <div className={"content"}>
                    <div>내용</div>
                  </div>
                </div>
                <div className={"address-tick"}>
                  <div className={"address-area"}>
                    <div className={"nickname"}>닉네임</div>
                    <div className={"town"}>동네</div>
                  </div>
                  <div className={"data-area"}>1달 전</div>
                </div>
                <div className={"comment-tick"}>
                  <div className={"comment-area"}>
                    {" "}
                    <div className={"views"}>조회수</div>
                    <div className={"comment"}>댓글</div>
                  </div>
                </div>
              </StContent>
            </div>
          </div>
        </div>
      </div>
    </StMypageHead>
  );
}
