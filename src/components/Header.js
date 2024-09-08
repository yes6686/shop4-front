import "./../App.css";
import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { PiFinnTheHumanLight } from "react-icons/pi";
import { BsClockHistory } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { searchInfo } from "../store/searchSlice";
import { useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { setIsNotAdmin } from "../store/adminSlice";
import { MdStoreMallDirectory } from "react-icons/md";
const Header = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const user = JSON.parse(sessionStorage.getItem("user")); // 세션에서 사용자 이름 가져오기
  const isLoggedIn = sessionStorage.getItem("isLoggedIn"); // 로그인 여부 확인

  const handleLogout = () => {
    // 로그아웃 처리 로직 예시
    sessionStorage.removeItem("isLoggedIn"); // 로그인 상태 제거
    sessionStorage.removeItem("user"); // 사용자 정보 제거
    //관리자 정보(adminSlice)삭제
    dispatch(setIsNotAdmin());
    // 로그아웃 후 페이지 리다이렉션
    navigate("/");
  };

  const handleLogin = () => {
    // 로그인 페이지로 이동하는 로직
    navigate("/login");
  };

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(searchInfo(search));
  }, [search]);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="App">
        <Navbar
          style={{
            background: "white",
            borderBottom: "1px solid #D8D8D8",
          }}
        >
          <Container>
            <Navbar.Brand
              onClick={() => navigate("/")}
              style={{ cursor: "pointer", fontSize: "30px" }}
            >
              <MdStoreMallDirectory /> Shop4
            </Navbar.Brand>
            <Nav className="me-auto"></Nav>
            <CiSearch style={{ width: "30px", height: "30px" }} />
            <input
              type="text"
              value={search}
              onChange={onChange}
              placeholder="Search..."
              className="search-input me-auto"
            />

            {/* 사용자 이름 표시 */}
            <Nav className="me-auto">
              {isLoggedIn ? (
                <Nav.Item className="me-2">
                  <button
                    onClick={handleLogout}
                    className="btn"
                    style={{ cursor: "pointer" }}
                  >
                    <IoLogOutOutline
                      style={{ height: "30px", width: "30px" }}
                    />
                    <br />
                    로그아웃
                  </button>
                </Nav.Item>
              ) : (
                <Nav.Item className="me-2">
                  <button
                    onClick={handleLogin}
                    className="btn"
                    style={{ cursor: "pointer" }}
                  >
                    <IoLogInOutline style={{ height: "30px", width: "30px" }} />
                    <br />
                    로그인
                  </button>
                </Nav.Item>
              )}
              <Nav.Item
                className="me-3 btn"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleNavigation("/mypage");
                }}
              >
                <PiFinnTheHumanLight
                  style={{ height: "30px", width: "30px" }}
                />
                <br />
                마이페이지
              </Nav.Item>
              <Nav.Item
                className="me-3 btn"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleNavigation("/recentlyViewed");
                }}
              >
                <BsClockHistory style={{ height: "30px", width: "30px" }} />
                <br />
                최근본상품
              </Nav.Item>
              <Nav.Item
                className="me-3 btn"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  isLoggedIn ? handleNavigation("/cart") : handleLogin();
                }}
              >
                <FiShoppingCart style={{ height: "30px", width: "30px" }} />
                <br />
                장바구니
              </Nav.Item>
              <Nav.Item></Nav.Item>
            </Nav>
            <h2 style={{ color: "black" }}>
              {isLoggedIn ? <div>{user.name + "님"}</div> : <div>Guest</div>}
            </h2>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
