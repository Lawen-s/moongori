import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import logoImg from "./../images/Logo.png";
import google from "./../images/google.png";
import kakao from "./../images/kakao.png";
axios.defaults.withCredentials = true;

export const StModalDiv = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  border: 1px solid;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: rgba(204, 255, 229, 0.7);
  .wrap {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    min-height: 600px;
    min-width: 500px;
    background: white;
    margin: 10px 0 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo {
      display: flex;
      margin-top: 40px;
      img {
        height: 40px;
        width: 40px;
        margin-top: 8px;
        margin-bottom: 10px;
      }
      .logoName {
        margin: 10px 10px 0 10px;
        text-align: center;
        color: black;
        text-decoration: none;
        font-size: 1.6em;
        font-family: Fredoka One;
      }
    }
    span {
      margin-bottom: 10px;
    }
    .change-modal {
      cursor: pointer;
      margin-left: 5px;
      color: blue;
      text-decoration: underline;
    }
  }
  .inputs {
    width: 70%;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    width: 70%;
  }
  @media all and (max-width: 425px) {
    .wrap {
      min-height: 500px;
      min-width: 300px;
    }
  }
`;

export const StWriteDiv = styled.div`
  margin-top: 10px;
  div {
    margin-bottom: 10px;
    font-weight: 700;
  }
  input {
    width: 100%;
    height: 36px;
    font-size: 0.9em;
    font-weight: 500;
    border-radius: 10px;
    outline-color: #aae8c5;
  }
  @media all and (max-width: 425px) {
    input {
      height: 30px;
    }
  }
`;

export const StRequestButton = styled.button`
  height: 50px;
  background: ${(props) => props.background};
  border: none;
  border-radius: 10px;
  margin-top: 20px;
  position: relative;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  :hover {
    box-shadow: gray 3px 3px 3px;
  }
  :active {
    box-shadow: none;
  }
  img {
    top: 8%;
    left: 0;
    position: absolute;
    width: 40px;
    height: 40px;
  }
  @media all and (max-width: 425px) {
    height: 30px;
    img {
      width: 30px;
      height: 30px;
    }
  }
`;

export default function Login({
  isLoginModal,
  showSignUpModal,
  handleLoginSuccess,
}) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputValue = (key, e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  // 이메일과 비밀번호를 입력했는지 확인
  // 2개를 모두 입력했으면 서버에 로그인 요청하기
  const handleLogin = () => {
    // 이메일 or 비밀번호를 입력하지 않은 경우
    if (loginInfo.email === "" || loginInfo.password === "") {
      Swal.fire({
        icon: "error",
        title: "회원정보를 입력해 주세요.",
      });
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/signin`, {
          email: loginInfo.email,
          password: loginInfo.password,
        })
        .then((res) => {
          // 로그인 성공
          isLoginModal(false);
          handleLoginSuccess();
          navigate("/");
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "로그인에 실패했습니다.",
            text: "아이디와 비밀번호를 정확히 입력해 주세요.",
          });
        });
    }
  };

  const handlekakaoLoginBtn = async () => {
    await window.location.assign("http://localhost:80/user/kakao");
    handleLoginSuccess();
  };
  const handlegoogleLoginBtn = async () => {
    await window.location.assign("http://localhost:80/user/google");
    handleLoginSuccess();
  };

  return (
    <StModalDiv onClick={() => isLoginModal(false)}>
      <div className={"wrap"} onClick={(e) => e.stopPropagation()}>
        <div className={"logo"}>
          <Link to={"/"} onClick={() => isLoginModal(false)}>
            <img src={logoImg} alt={"로고"} />
          </Link>
          <Link
            to={"/"}
            onClick={() => isLoginModal(false)}
            className={"logoName"}
          >
            <div>moongori</div>
          </Link>
        </div>
        <span>
          회원이 아니신가요?
          <span className={"change-modal"} onClick={showSignUpModal}>
            회원가입 하러가기
          </span>
        </span>
        <div className={"inputs"}>
          <StWriteDiv>
            <div>이메일</div>
            <input
              type={"email"}
              onChange={(e) => handleInputValue("email", e)}
            ></input>
          </StWriteDiv>
          <StWriteDiv>
            <div>비밀번호</div>
            <input
              type={"password"}
              onChange={(e) => handleInputValue("password", e)}
            ></input>
          </StWriteDiv>
        </div>
        <div className={"buttons"}>
          <StRequestButton background={"#AAE8C5"} onClick={handleLogin}>
            로그인
          </StRequestButton>
          <StRequestButton
            background={"#FFFFFF"}
            onClick={handlegoogleLoginBtn}
          >
            <img src={google} alt={"구글이미지"} />
            구글 로그인
          </StRequestButton>
          <StRequestButton background={"#FFE200"} onClick={handlekakaoLoginBtn}>
            <img src={kakao} alt={"카카오이미지"} />
            카카오톡 로그인
          </StRequestButton>
        </div>
      </div>
    </StModalDiv>
  );
}
