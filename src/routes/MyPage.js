import "./css/MyPage.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import defaultImage from "../images/bg.jpg";
import { updateMember } from "../services/MemberService.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyPage = () => {
  const user = JSON.parse(sessionStorage.getItem("user")); // 세션에서 사용자 이름 가져오기
  const isLoggedIn = sessionStorage.getItem("isLoggedIn"); // 로그인 여부 확인

  // 유저 이미지 관리 변수 및 함수
  const [image, setImage] = useState(defaultImage);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file); // 이미지 파일을 base64 URL로 변환
    }
  };

  // 이메일 변경
  const [email, setEmail] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");

  const setUserState = () => {
    setEmail(user.email);
    setUserPw(user.userPw);
    setUserName(user.name);
  };

  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const handleSaveEmail = () => {
    // 이메일 저장 로직 추가
    setIsEditingEmail(false);
  };

  // 유저 이름 변경
  const [isEditingUserName, setIsEditingUserName] = useState(false);

  const handleSaveUserName = () => {
    setIsEditingUserName(false);
  };

  // 모달 창
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  let navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn || !user) {
      alert("로그인을 하셔야합니다.");
      navigate("/login"); // 로그인되지 않았거나 사용자 정보가 없는 경우 로그인 페이지로 이동
      return;
    }
    if (user) {
      setUserState();
    }
  }, [isLoggedIn, user]);

  if (!user) {
    return null; // user가 null일 경우 컴포넌트를 렌더링하지 않음
  }

  return (
    <>
      <div className="myPageContainer">
        {/* 왼쪽 부분 */}
        <div className="leftContent">
          <h4 style={{ fontWeight: "bold", marginLeft: "30px" }}>마이페이지</h4>
          <br />ㄴ
          <ul style={{ listStyleType: "none" }}>
            <h5
              className="headLine"
              style={{ fontWeight: "bold", marginBottom: "15px" }}
            >
              내 정보
            </h5>
            <li>
              <Link to="/myPage">프로필 정보</Link>
            </li>
            <li>주소록</li>
            <li>결제 정보</li>
          </ul>
          <br />
          <ul style={{ listStyleType: "none" }}>
            <h5 style={{ fontWeight: "bold", marginBottom: "15px" }}>
              쇼핑 정보
            </h5>
            <li>구매 내역</li>
            <li>관심 상품</li>
          </ul>
        </div>

        {/* 오른쪽 부분 */}
        <div className="rightContent">
          <h4 style={{ marginTop: "20px", fontWeight: "bold" }}>프로필 정보</h4>
          <hr
            style={{
              border: "none",
              width: "80%",
              height: "5px",
              backgroundColor: "black",
            }}
          />

          {/* 이미지랑 이름 */}
          <div className="myPageSection1">
            {/* 이미지 부분 */}
            <div style={{ padding: "15px" }}>
              <button
                className="btn"
                style={{ cursor: "pointer", border: "none" }}
              >
                <img
                  src={image}
                  alt="Description"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />
              </button>
            </div>

            {/* 이름 부분 */}
            <div>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "26px",
                  display: "inline-block",
                  marginBottom: "10px",
                }}
              >
                {user.name} 님
              </span>
              <br />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="imageUpload"
                onChange={handleImageChange}
              />
              <label
                htmlFor="imageUpload"
                className="btn"
                style={{ fontSize: "12px", cursor: "pointer" }}
              >
                이미지 변경
              </label>
              <button
                className="btn"
                style={{ fontSize: "12px", marginLeft: "15px" }}
                onClick={() => {
                  console.log(image);
                }}
              >
                삭제
              </button>
            </div>
          </div>

          <hr style={{ width: "80%" }} />
          <br />

          {/* 로그인 정보 블록 */}
          <div className="myPageSection2">
            <h5 style={{ fontWeight: "bold" }}>로그인 정보</h5>

            {/* 이메일 부분 */}
            <div className="list">
              <div>
                <label>이메일 주소</label>
                <br />

                {isEditingEmail ? (
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <span>{email}</span>
                )}
              </div>

              <button
                className="btn"
                type="button"
                onClick={() => {
                  if (isEditingEmail) {
                    handleSaveEmail(); // 이메일 저장 로직 실행
                  } else {
                    setIsEditingEmail(true); // 수정 모드로 전환
                  }
                }}
              >
                {isEditingEmail ? "저장" : "변경"}
              </button>
            </div>

            {/* 비밀번호 부분 */}
            <div className="list">
              <div>
                <label>비밀번호</label>
                <br />

                <span>{"●".repeat(8)}</span>
              </div>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                변경
              </button>

              {modalOpen && (
                <MemberPwUpdate
                  userPw={userPw}
                  closeModal={closeModal}
                  user={user}
                />
              )}
            </div>
          </div>

          {/* 개인 정보 칸 */}
          <div className="myPageSection3">
            <h5 style={{ fontWeight: "bold" }}>개인 정보</h5>

            <div className="list">
              <div>
                <label>이름</label> <br />
                {isEditingUserName ? (
                  <input
                    type="text"
                    className="form-control"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                ) : (
                  <span>{userName}</span>
                )}
              </div>
              <div>
                <button
                  className="btn"
                  type="button"
                  onClick={() => {
                    if (isEditingUserName) {
                      handleSaveUserName(); // 이름 저장 로직 실행
                    } else {
                      setIsEditingUserName(true); // 수정 모드로 전환
                    }
                  }}
                >
                  {isEditingUserName ? "저장" : "변경"}
                </button>
              </div>
            </div>
            <div className="list">
              <div>
                <label>휴대폰 번호</label>
                <br />
                <span>{user.phone}</span>
              </div>
              <button className="btn" type="button">
                변경
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};



function MemberPwUpdate({ userPw, closeModal, user }) {
  // 비밀번호 변경 변수들 (현재 비밀번호, 새 비밀번호, 새 비밀번호 확인용)
  const [currentUserPw, setCurrentUserPw] = useState("");
  const [newUserPw, setNewUserPw] = useState("");
  const [confirmUserPw, setConfirmUserPw] = useState("");
  const maxLength = 20; // 최대 글자 수 설정
  const [confirmCurrentUserPw, setConfirmCurrentUserPw] = useState(false);
  const [confirmNewUserPw, setConfirmNewUserPw] = useState(false);

  const handleCurrentUserPw = (event) => {
    setCurrentUserPw(event.target.value);
  };
  const handleNewUserPw = (e) => {
    setNewUserPw(e.target.value);
  };
  const handleConfirmUserPw = (e) => {
    setConfirmUserPw(e.target.value);
  };

  const changeUserPw = () => {
    setConfirmCurrentUserPw(false); // Reset error state
    setConfirmNewUserPw(false); // Reset error state

    if (currentUserPw !== userPw) {
      setConfirmCurrentUserPw(true);
    }
    if (newUserPw !== confirmUserPw) {
      setConfirmNewUserPw(true);
    }

    if (currentUserPw === userPw && newUserPw === confirmUserPw) {
      let member = { userPw: newUserPw };
      // Update password via API call
      updateMember(user.id, member)
        .then((res) => {
          console.log("비밀번호 변경 성공!");
          sessionStorage.setItem("user", JSON.stringify(res.data));
          toast.success("비밀번호 변경이 완료되었습니다."); // Show success toast
          closeModal();
        })
        .catch((error) => {
          console.error("비밀번호 변경 실패", error);
          toast.error("비밀번호 변경에 실패했습니다."); // Show error toast
        });
    }
  };

  return (
    <>
      <div className={"modal-container"}>
        <div className={"modal-content"}>
          <h3>비밀번호 변경</h3>
          <hr />
          <br />
          <div className="input-container">
            <input
              type="password"
              value={currentUserPw}
              placeholder="현재 비밀번호"
              onChange={handleCurrentUserPw}
              className="input-underline"
            />
            {confirmCurrentUserPw && (
              <span className="error-message">
                현재 비밀번호가 일치하지 않습니다.
              </span>
            )}
            <span className="char-count">
              {currentUserPw.length}/{maxLength}
            </span>
          </div>

          <div className="input-container">
            <input
              type="password"
              value={newUserPw}
              placeholder="새 비밀번호"
              onChange={handleNewUserPw}
              className="input-underline"
            />
            <span className="char-count">
              {newUserPw.length}/{maxLength}
            </span>
          </div>

          <div className="input-container">
            <input
              type="password"
              value={confirmUserPw}
              placeholder="비밀번호 확인"
              onChange={handleConfirmUserPw}
              className="input-underline"
            />
            {confirmNewUserPw && (
              <span className="error-message">
                새 비밀번호가 일치하지 않습니다.
              </span>
            )}
            <span className="char-count">
              {confirmUserPw.length}/{maxLength}
            </span>
          </div>

          <div className="button-container">
            <button className="btn modal-close-btn" onClick={changeUserPw}>
              변경
            </button>
            <button className="btn modal-close-btn" onClick={closeModal}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;
