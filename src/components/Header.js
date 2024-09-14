import "./../App.css";
import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { PiFinnTheHumanLight } from "react-icons/pi";
import { BsClockHistory } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { searchInfo } from "../store/searchSlice";
import { useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { setIsNotAdmin } from "../store/adminSlice";
import { MdStoreMallDirectory } from "react-icons/md";
import { requestedListFriends } from "../services/FriendService";

const Header = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 가져오기 위한 useLocation 훅

  const handleNavigation = (path) => {
    navigate(path);
  };

  const user = JSON.parse(sessionStorage.getItem("user")); // 세션에서 사용자 이름 가져오기
  const isLoggedIn = sessionStorage.getItem("isLoggedIn"); // 로그인 여부 확인

  // useEffect(() => {
  //   if (user) {
  //     const member_id = user.id;
  //     requestedListFriends(member_id)
  //       .then((response) => {
  //         setFriendRequests(response.data); // 데이터 저장
  //       })
  //       .catch((error) => {
  //         console.error('친구 요청 목록을 가져오는 데 실패했습니다.', error);
  //       });
  //   }
  // }, [user]);

  const handleLogout = () => {
    // 로그아웃 처리 로직 예시
    sessionStorage.removeItem("isLoggedIn"); // 로그인 상태 제거
    sessionStorage.removeItem("user"); // 사용자 정보 제거
    // 관리자 정보(adminSlice)삭제
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
    if (location.pathname === "/") {
      // Home 화면에서만 searchInfo 호출
      dispatch(searchInfo(search));
    }
  }, [search, location.pathname]); // location.pathname을 의존성 배열에 추가

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
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
            disabled={location.pathname !== "/"} // Home 화면이 아닐 때 비활성화
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
                    style={{
                      height: "30px",
                      width: "30px",
                    }}
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
                  <IoLogInOutline
                    style={{
                      height: "30px",
                      width: "30px",
                    }}
                  />
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
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  textAlign: "center",
                }}
              >
                <PiFinnTheHumanLight
                  style={{ height: "30px", width: "30px" }}
                />
                {friendRequests.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%", // 이미 원형이지만, 패딩과 크기 조정으로 더 동그랗게
                      padding: "5px 8px", // 패딩을 늘려서 배지를 더 크게
                      fontSize: "12px",
                      minWidth: "20px", // 최소 너비 설정으로 배지가 너무 작아 보이지 않도록
                      height: "20px", // 높이 설정으로 더 정확한 원형 유지
                      display: "flex", // 내용을 중앙에 위치시키기
                      alignItems: "center", // 수직 중앙 정렬
                      justifyContent: "center", // 수평 중앙 정렬
                    }}
                  >
                    {friendRequests.length}
                  </span>
                )}
                <br />
                마이페이지
              </div>
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
  );
};

export default Header;
