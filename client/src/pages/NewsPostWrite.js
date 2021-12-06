import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import MapContainer from "../components/MapContainer";
import SearchPlace from "../components/SearchPlace";
import MapPopUp from "../components/MapPopUp";
import DaumPostcode from "react-daum-postcode";

const StPopupBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;
const StNewsPostWriteHead = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px; // 푸터 내리기
  overflow-y: auto;
`;
const StWriteTitle = styled.div`
  height: 50px;
  width: 60%;
  display: flex;
  justify-content: start;
  border-bottom: 1px solid #b7b7b7;
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: bold;
`;
const StWriteBox = styled.div`
  height: 700px;
  width: 60%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
  .select-category {
    margin-bottom: 20px;
    width: 80%;
    margin-top: 10px;
  }
  .addition-wrap {
    margin-right: 20px;
    margin-bottom: 30px;
    display: flex;
    justify-content: end;
    width: 80%;
  }
  .input-area {
    overflow-y: hidden;
    resize: none;
    width: 600px;
    height: 300px;
    border: 1px solid gray;
    outline: none;
    border-radius: 2px;
    line-height: 2.5rem;
    font-size: 15px;
    @media all and (max-width: 768px) {
      width: 300px;
    }
    @media all and (max-width: 557px) {
      width: 250px;
    }
  }
`;
const StButtonBox = styled.div`
  height: 100px;
  width: 75%;
  display: flex;
  .button-wrap {
    margin-top: 20px;
    width: 50%;
    display: flex;
    justify-content: end;
    .button {
      border-radius: 15px;
      background: #aae8c5;
      border: 1px solid #b7b7b7;
      height: 30px;
      width: 50px;
      margin-right: 10px;
    }
  }
`;
export default function NewsPostWrite({ searchPlace }) {
  const [selected, setSelected] = useState("");
  const [postWrite, setPostWrite] = useState({
    contents: "",
  });
  const [location, setLocation] = useState({
    address: "",
  });

  const [isOpenPopup, setisOpenPopup] = useState(false);
  const handleInputValue = (key) => (e) => {
    setPostWrite({ ...postWrite, [key]: e.target.value });
  };

  const locationInfo = location.address;
  console.log(locationInfo);
  const options = useMemo(
    () => [
      { value: "취미", label: "취미" },
      { value: "맛집", label: "맛집" },
      { value: "반려동물", label: "반려동물" },
      { value: "동네소식", label: "동네소식" },
    ],
    []
  );

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
    setLocation({ ...location, ["address"]: fullAddr });
    setisOpenPopup(false);
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
  const handleChange = (selected) => {
    setSelected(selected);
  };
  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };
  const openPopup = () => {
    setisOpenPopup(true);
  };
  const closePopup = () => {
    setisOpenPopup(false);
  };

  return (
    <>
      <StNewsPostWriteHead>
        <StWriteTitle>게시글 작성</StWriteTitle>
        <StWriteBox>
          <div className={"select-category"}>
            <Select
              options={options}
              value={selected}
              onChange={handleChange}
              defaultMenuIsOpen
            />
          </div>
          <div className={"addition-wrap"}>
            <div>사진</div>
            <div
              className={"location-button"}
              onClick={() => {
                openPopup();
              }}
            >
              위치
            </div>
            {isOpenPopup && (
              <StPopupBackground
                onClick={() => {
                  closePopup();
                }}
              >
                <DaumPostcode
                  style={postCodeStyle}
                  theme={postThemeStyle}
                  autoClose
                  onComplete={onCompletePost}
                />
              </StPopupBackground>
            )}
          </div>
          <div className={"write-wrap"}>
            <textarea
              className={"input-area"}
              onChange={handleInputValue("contents")}
            ></textarea>
            <div className={"picture-area"}></div>
          </div>
          <div className={"location-wrap"}>
            <MapContainer locationInfo={locationInfo} />
          </div>
        </StWriteBox>
        <StButtonBox>
          <div className={"button-wrap"}></div>
          <div className={"button-wrap"}>
            <button className={"button"}>취소</button>
            <button className={"button"}>완료</button>
          </div>
        </StButtonBox>
      </StNewsPostWriteHead>
    </>
  );
}
