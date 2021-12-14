import React from "react";
import styled from "styled-components";
import logoWhite from "./../images/흰색 로고.png";

const FooterBox = styled.div`

  background-color: #777777;
  color: #ffffff;
  position: relative;
  left: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  a {
    text-decoration-line: none;
    color: #9c9c9c;
  }

  // phone
  @media all and (max-width: 768px) {
    width: 100%;
  }
  .LogoName {
    margin-top: 3px;
    text-decoration: none;
    font-family: Fredoka One;
  }
  img {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 3px;
    width: 20px;
    height: 20px;
  }
  .footer-master {
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: center;
  }
  .footer-material {
    width: 40%;
    border-bottom: 1px solid #8f8f8f;
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .Footer-content {
    height: 60%;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .About-wrap {
    color: #ffffff;
    font-size: 9px;
    font-weight: bold;
    margin-bottom: 2px;
  }
  .About-content {
    text-align:start;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 5px;
    font-weight: normal;
  }
  .Contact-title {
    margin-top: 5px;
    font-size: 9px;
    font-weight: bold;
    margin-bottom: 2px;
  }
  .Contact-content {
    font-size: 5px;
    font-weight: normal;
    display: flex;
    flex-direction: column;
  }
  .Copyright {
    width: 100%;
    height: 20%;
    font-size: 5px;
    font-weight: normal;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .footer-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  // web
  @media all and (min-width: 769px) {
    bottom: 0px;
    height: 200px;
    width: 100%;
  }
  .footer-master {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
  }
  .footer-material {
    width: 60%;
    border-bottom: 1px solid #8f8f8f;
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .Footer-content {
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
  }
  .About-wrap {
    margin-top: 20px;
    width: 50%;
    font-size: 9px;
    font-weight: bold;
    margin-bottom: 2px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    text-align: start;
  }

  .content-wrap {
    width: 60%;
    height:90%;
    display: flex;
    flex-direction: row;
  }

  .About-us {
    width: 50%;
    height:90%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .About-content {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
  }
  .Contact-us {
    margin-bottom:10px;
    width: 50%;
    height:90%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .Contact-wrap {
    margin-left:50px;
    margin-top: 20px;
    width: 60%;
    font-size: 9px;
    font-weight: bold;
    margin-bottom: 2px;
    display: flex;
    align-items: start;
    text-align: start;
    justify-content: flex-start;
    flex-direction: column;
    @media all and (max-width: 769px) {
      margin-left:5px;
    }
  }

  .Contact-content {
    margin-top: 12px;
    display: flex;
    flex-direction: row;
  }
  .name {
    margin-right: 5px;
    font-size: 11px;
  }
  .About-title {
    font-size: 13px;
  }
  .Contact-comment {
    font-size: 13px;
  }
  @media all and (max-width: 557px) {
    .Contact-content {
      display: flex;
      flex-direction: column;
    }
    .About-content {
      display: flex;
      flex-direction: column;
    }
    .About-title {
      font-size: 11px;
    }
    .Contact-comment {
      font-size: 11px;
    }
    .name {
      font-size: 5px;
    }
    .reposit{
      font-size: 5px;
      margin-right:6px;
    }
    .copyright-content {
      font-size: 4px;
    }
  }
`;

export default function Footer() {
  return (
    <FooterBox>
      <div className={"footer-wrap"}>
        <div className={"footer-master"}>
          <div className={"footer-material"}>
            <img src={logoWhite} alt={"footer logo"}></img>
            <div className={"LogoName"}>moongori</div>
          </div>
        </div>
        <div className={"Footer-content"}>
          <div className={"content-wrap"}>
            <div className={"About-us"}>
              <div className={"About-wrap"}>
                <div className={"About-title"}>About us</div>
                <div className={"About-content"}>
                  <p className={"name"}>
                    <a href="github.com/codestates/moongori/wiki">
                      Moongori Wiki
                    </a>
                  </p>
                  <p className={"reposit"}>
                    <a href="github.com/codestates/moongori">
                      Repository
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className={"Contact-us"}>
              <div className={"Contact-wrap"}>
                <div className={"Contact-comment"}>Contact us</div>
                <div className={"Contact-content"}>
                  <p className={"name"}>
                    <a href="github.com/Lawen-s">사범기</a>
                  </p>
                  <p className={"name"}>
                    <a href="github.com/rmfhsep">김정훈</a>
                  </p>
                  <p className={"name"}>
                    <a href="github.com/lsm6627">이성민</a>
                  </p>
                  <p className={"name"}>
                    <a href="github.com/lsj135779">이승준</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"Copyright"}>
          <div className={"copyright-content"}>
            Copyright The Moon project Team
          </div>
        </div>
      </div>
    </FooterBox>
  );
}
