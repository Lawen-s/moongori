import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import TradeList from "./pages/TradeList";
import NewsList from "./pages/NewsList";
import Mypage from "./pages/Mypage";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import NewsPostWrite from "./pages/NewsPostWrite";
import axios from "axios";

import Swal from "sweetalert2";

axios.defaults.withCredentials = true;

const Wrap = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`;

export default function App() {
  const [userinfo, setUserinfo] = useState(null);
  const [login, isLogin] = useState(false);

  const isAuthenticated = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/info`)
      .then((res) => {
        setUserinfo(res.data.data);
        isLogin(true);
      })
      .catch((err) => console.log(err));
  };

  const handleLoginSuccess = () => {
    isAuthenticated();
  };

  const handleLogout = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/user/signout`).then(() => {
      window.location.href = "/";
      isLogin(false);
      setUserinfo(null);
    });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <BrowserRouter>
      <Wrap>
        <Header
          login={login}
          handleLoginSuccess={handleLoginSuccess}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/trade=:category" element={<TradeList />} />

          <Route
            path="/news=:category"
            element={<NewsList userinfo={userinfo} login={login} />}
          />

          <Route
            path="/mypage"
            element={<PrivateRoute login={login} userinfo={userinfo} />}
          />
          <Route path="/news/write" element={<NewsPostWrite />} />
          {/* <Route path="/trade-normal/read=:id" element={<TradeNormalPost />} />

          <Route
            path="/trade-suggestion/read=:id"
            element={<TradeSuggestionPost />}
          />

          <Route path="/trade/write" element={<TradePostWrite />} />

          <Route path="/news/read=:id" element={<NewsPost />} />

        

          <Route path="/chat" element={<Chat />} /> */}

          <Route element={<NotFound />} />
        </Routes>
        <Footer />
      </Wrap>
    </BrowserRouter>
  );
}
