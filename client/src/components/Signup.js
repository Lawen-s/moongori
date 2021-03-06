/* eslint-disable no-useless-escape */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import DaumPostcode from "react-daum-postcode";
import logoImg from "./../images/Logo.png";
import { StModalDiv, StWriteDiv, StRequestButton } from "./Login";
axios.defaults.withCredentials = true;

const StPostModalDiv = styled.div`
  z-index: 11;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
`;

const StModalReUse = styled(StModalDiv)`
  .wrap {
    min-height: 700px;
  }
`;

const StWriteReUse = styled(StWriteDiv)`
  .check {
    display: flex;
    input {
      width: 70%;
      border-right: 1px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      font-size: ${(props) => props.fontSize || "1em"};
    }
    button {
      width: 30%;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      background: #aae8c5;
      :hover {
        box-shadow: gray 3px 3px 3px;
      }
      :active {
        box-shadow: none;
      }
      @media all and (max-width: 514px) {
        font-size: 0.5em;
      }
    }
  }
`;

const StAddressModalDiv = styled.div`
  margin-top: 5px;
  color: ${(props) => props.color || "red"};
  font-size: 0.9em;
`;

export function getDistance(lat1, lon1, lat2, lon2) {
  if (lat1 === lat2 && lon1 === lon2) return 0;

  let radLat1 = (Math.PI * lat1) / 180;
  let radLat2 = (Math.PI * lat2) / 180;
  let theta = lon1 - lon2;
  let radTheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  if (dist > 1) dist = 1;

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515 * 1.609344 * 1000;
  if (dist < 100) dist = Math.round(dist / 10) * 10;
  else dist = Math.round(dist / 100) * 100;

  return dist;
}

export default function Signup({ isSingUpModal, showLoginModal }) {
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    nickname: "",
    address: "",
    town: "",
    password: "",
    passwordCheck: "",
  });
  const [checkInfo, setCheckInfo] = useState({
    email: false, // ????????? ?????????
    duplicatedEmail: false, // ????????? ??????
    nickname: false, // ????????? ?????????
    duplicatedNickname: false, // ????????? ??????
    address: false,
    password: false, // ???????????? ?????????
    passwordCheck: false, // ???????????? ??????
  });
  const [openPost, isOpenPost] = useState(false);
  // ???????????? ????????? ????????????
  const [googleCoordinate, setGoogleCoordinate] = useState({
    lat: null,
    log: null,
  });
  // ????????? ?????? ??????
  const [kakaoCoordinate, setKakaoCoordinate] = useState({
    lat: null,
    log: null,
  });
  const navigate = useNavigate();

  const handleInputValue = (key, e) => {
    setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
    // ????????? ??????
    if (key === "email") {
      // ????????? ?????? ???????????? ????????? ???????????? ??????
      if (isEmail(e.target.value)) {
        setCheckInfo({ ...checkInfo, email: true, duplicatedEmail: false });
      } else {
        // ????????? ?????? ??????
        setCheckInfo({ ...checkInfo, email: false, duplicatedEmail: false });
      }
    }
    // ????????? ??????
    if (key === "nickname") {
      // ????????? ????????? ??????
      if (isNickname(e.target.value)) {
        setCheckInfo({
          ...checkInfo,
          nickname: true,
          duplicatedNickname: false,
        });
      } else {
        // ????????? ?????? ??????
        setCheckInfo({
          ...checkInfo,
          nickname: false,
          duplicatedNickname: false,
        });
      }
    }
    // ???????????? ??????
    if (key === "password") {
      // ???????????? ????????? ??????
      if (isPassword(e.target.value)) {
        if (e.target.value === signUpInfo.passwordCheck) {
          // ???????????? ??????
          setCheckInfo({ ...checkInfo, password: true, passwordCheck: true });
        } else {
          setCheckInfo({ ...checkInfo, password: true, passwordCheck: false });
        }
      } else {
        // ????????? ?????? ??????
        setCheckInfo({ ...checkInfo, password: false, passwordCheck: false });
      }
    }
    // ???????????? ?????? ??????
    if (key === "passwordCheck") {
      if (checkInfo.password) {
        if (e.target.value === signUpInfo.password) {
          setCheckInfo({ ...checkInfo, passwordCheck: true });
        } else {
          setCheckInfo({ ...checkInfo, passwordCheck: false });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "???????????? ?????? ???????????????.",
        });
        e.target.value = "";
      }
    }
  };

  // ????????? ???????????? ??????
  const checkEmail = () => {
    // ????????? ????????? ????????? ??????????????? ??????
    if (checkInfo.email) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/email`, {
          email: signUpInfo.email,
        })
        .then(() => {
          // ????????? ?????? ??????
          setCheckInfo({
            ...checkInfo,
            duplicatedEmail: true,
          });
          Swal.fire({
            icon: "success",
            title: "?????? ????????? ??????????????????.",
          });
        })
        .catch(() => {
          // ????????? ?????????
          Swal.fire({
            icon: "error",
            title: "????????? ??????????????????.",
          });
        });
    } else {
      // ?????????????????? ?????? ?????? ?????????
      Swal.fire({
        icon: "error",
        title: "????????? ??? ?????? ??????????????????.",
      });
    }
  };

  // ????????? ???????????? ??????
  const checkNickname = () => {
    // ????????? ????????? ????????? ??????????????? ??????
    if (checkInfo.nickname) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/nickname`, {
          nickname: signUpInfo.nickname,
        })
        .then(() => {
          // ????????? ?????? ??????
          setCheckInfo({
            ...checkInfo,
            duplicatedNickname: true,
          });
          Swal.fire({
            icon: "success",
            title: "?????? ????????? ??????????????????.",
          });
        })
        .catch(() => {
          // ????????? ?????????
          Swal.fire({
            icon: "error",
            title: "????????? ??????????????????.",
          });
        });
    } else {
      // ?????????????????? ?????? ?????? ?????????
      Swal.fire({
        icon: "error",
        title: "????????? ??? ?????? ??????????????????.",
      });
    }
  };

  // ????????? ????????? ?????? ??????
  const isEmail = (value) => {
    let regExp =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{3,})$/i;
    return regExp.test(value);
  };

  // ????????? ????????? ?????? ??????
  const isNickname = (value) => {
    let regExp = /^[???-???]{3,8}$/;
    return regExp.test(value);
  };

  // ???????????? ????????? ?????? ??????
  const isPassword = (value) => {
    let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
    return regExp.test(value);
  };

  // ????????? ???????????? ???????????? ??????
  const signUp = () => {
    if (
      checkInfo.email &&
      checkInfo.duplicatedEmail &&
      checkInfo.nickname &&
      checkInfo.duplicatedNickname &&
      checkInfo.address &&
      checkInfo.password &&
      checkInfo.passwordCheck
    ) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/signup`, {
          email: signUpInfo.email,
          nickname: signUpInfo.nickname,
          address: signUpInfo.address,
          town: signUpInfo.town,
          password: signUpInfo.password,
          latitude: kakaoCoordinate.lat,
          longitude: kakaoCoordinate.log,
        })
        .then((res) => {
          isSingUpModal(false);
          navigate("/");
          Swal.fire({
            icon: "success",
            title: "????????? ????????? ??????????????????.",
            // title: "??????????????? ?????????????????????.",
            // text: "????????? ????????? ??????????????????.",
          });
        });
    } else if (!checkInfo.email || signUpInfo.email === "") {
      Swal.fire({
        icon: "error",
        title: "???????????? ????????? ?????? ??????????????????.",
      });
    } else if (!checkInfo.nickname || signUpInfo.nickname === "") {
      Swal.fire({
        icon: "error",
        title: "???????????? ????????? ?????? ??????????????????.",
      });
    } else if (!checkInfo.address || signUpInfo.address === "") {
      Swal.fire({
        icon: "error",
        title: "????????? ??????????????????.",
      });
    } else if (!checkInfo.password || signUpInfo.password === "") {
      Swal.fire({
        icon: "error",
        title: "??????????????? ????????? ?????? ??????????????????.",
      });
    } else if (!checkInfo.passwordCheck || signUpInfo.passwordCheck === "") {
      Swal.fire({
        icon: "error",
        title: "???????????? ????????? ????????????.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "????????? ???????????? ????????? ??????????????????.",
      });
    }
  };

  // ?????? ?????? ?????? (??????, ????????? ?????? ?????? ??????)
  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = "";
    const { kakao } = window;
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(fullAddr, (results, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const lat = results[0].y;
        const log = results[0].x;
        // console.log("????????????", lat, " ", log);
        // console.log(
        //   "?????? ????????????",
        //   googleCoordinate.lat + " " + googleCoordinate.log
        // );
        // console.log(
        //   "??????",
        //   getDistance(googleCoordinate.lat, googleCoordinate.log, lat, log)
        // );

        if (
          getDistance(googleCoordinate.lat, googleCoordinate.log, lat, log) <=
          3000
        ) {
          setKakaoCoordinate({ ...kakaoCoordinate, lat: lat, log: log });
          if (data.addressType === "R") {
            if (data.buildingName !== "") {
              extraAddr += data.buildingName;
            }
            fullAddr += extraAddr;
          }

          setSignUpInfo({ ...signUpInfo, town: data.bname, address: fullAddr });
          setCheckInfo({ ...checkInfo, address: true });
          isOpenPost(false);
        } else {
          setSignUpInfo({ ...signUpInfo, address: "", town: "" });
          setCheckInfo({ ...checkInfo, address: false });
          isOpenPost(false);
          Swal.fire({
            icon: "error",
            title: "???????????? ????????? ?????? ????????? ???????????? ????????????.",
          });
        }
      }
    });
  };

  const handleAddressFocus = () => {
    if (!openPost) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          setGoogleCoordinate({
            ...googleCoordinate,
            lat: position.coords.latitude,
            log: position.coords.longitude,
          });
          isOpenPost(true);
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "???????????? ???????????? ????????? ??????????????? ???????????????.",
            text: "???????????? ???????????? ??????????????? ???????????????.",
          });
          isSingUpModal(false);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    }
  };

  const postCodeStyle = {
    display: "block",
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "400px",
    height: "500px",
    transform: "translate(-50%, -50%)",
    padding: "7px",
  };

  const postThemeStyle = {
    bgColor: "#D6FFEA",
    outlineColor: "#222222",
  };

  return (
    <>
      {openPost ? (
        <StPostModalDiv onClick={() => isOpenPost(false)}>
          <DaumPostcode
            style={postCodeStyle}
            theme={postThemeStyle}
            autoClose
            onComplete={onCompletePost}
          />
        </StPostModalDiv>
      ) : null}
      <StModalReUse onClick={() => isSingUpModal()}>
        <div className={"wrap"} onClick={(e) => e.stopPropagation()}>
          <div className={"logo"}>
            <Link to={"/"} onClick={() => isSingUpModal(false)}>
              <img src={logoImg} alt={"??????"} />
            </Link>
            <Link
              to={"/"}
              onClick={() => isSingUpModal(false)}
              className={"logoName"}
            >
              <div>moongori</div>
            </Link>
          </div>
          <span>
            ?????? ???????????????????
            <span className={"change-modal"} onClick={showLoginModal}>
              ????????? ????????????
            </span>
          </span>
          <div className={"inputs"}>
            <StWriteReUse>
              <div>?????????</div>
              <div className={"check"}>
                <input
                  type={"email"}
                  onChange={(e) => handleInputValue("email", e)}
                ></input>
                <button onClick={checkEmail}>?????? ??????</button>
              </div>
            </StWriteReUse>
            {checkInfo.duplicatedEmail ? (
              <StAddressModalDiv color={"blue"}>
                ?????? ????????? ??????????????????.
              </StAddressModalDiv>
            ) : signUpInfo.email !== "" ? (
              checkInfo.email ? (
                <StAddressModalDiv>??????????????? ????????????.</StAddressModalDiv>
              ) : (
                <StAddressModalDiv>
                  ????????? ??? ?????? ??????????????????.
                </StAddressModalDiv>
              )
            ) : null}
            <StWriteReUse>
              <div>?????????</div>
              <div className={"check"}>
                <input
                  type={"text"}
                  onChange={(e) => handleInputValue("nickname", e)}
                ></input>
                <button onClick={checkNickname}>?????? ??????</button>
              </div>
            </StWriteReUse>
            {checkInfo.duplicatedNickname ? (
              <StAddressModalDiv color={"blue"}>
                ?????? ????????? ??????????????????.
              </StAddressModalDiv>
            ) : signUpInfo.nickname !== "" ? (
              checkInfo.nickname ? (
                <StAddressModalDiv>??????????????? ????????????.</StAddressModalDiv>
              ) : (
                <StAddressModalDiv>
                  ?????? 3~8????????? ?????? ???????????????.
                </StAddressModalDiv>
              )
            ) : null}
            <StWriteReUse fontSize={"0.5em"}>
              <div>??????</div>
              <input
                type={"text"}
                value={signUpInfo.address}
                onFocus={handleAddressFocus}
              ></input>
            </StWriteReUse>
            <StWriteReUse>
              <div>????????????</div>
              <input
                type={"password"}
                onChange={(e) => handleInputValue("password", e)}
              ></input>
            </StWriteReUse>
            {signUpInfo.password !== "" ? (
              checkInfo.password ? null : (
                <StAddressModalDiv>
                  8 ~ 16??? ??????, ?????? ?????? ?????????.
                </StAddressModalDiv>
              )
            ) : null}
            <StWriteReUse>
              <div>??????????????????</div>
              <input
                type={"password"}
                onChange={(e) => handleInputValue("passwordCheck", e)}
              ></input>
            </StWriteReUse>
            {signUpInfo.passwordCheck !== "" ? (
              checkInfo.passwordCheck ? null : (
                <StAddressModalDiv>
                  ??????????????? ???????????? ????????????.
                </StAddressModalDiv>
              )
            ) : null}
          </div>
          <div className={"buttons"}>
            <StRequestButton background={"#AAE8C5"} onClick={signUp}>
              ????????????
            </StRequestButton>
          </div>
        </div>
      </StModalReUse>
    </>
  );
}
