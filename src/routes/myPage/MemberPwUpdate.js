import React, { useEffect, useState } from "react";
import { toast} from "react-toastify";
import { updateMember } from "../../services/MemberService.js";
// 비밀번호 변경 모달창
// !!! 비밀번호 변경 시에 setUser로 user객체 바꾸고 sessionStorage에도 변경된 값으로 set
function MemberPwUpdate({ closeModal, user, setUser }) {
    const [userPw, setUserPw] = useState(user.userPw);
    // 비밀번호 변경 변수들 (현재 비밀번호, 새 비밀번호, 새 비밀번호 확인용)
    const [currentUserPw, setCurrentUserPw] = useState("");
    const [newUserPw, setNewUserPw] = useState("");
    const [confirmUserPw, setConfirmUserPw] = useState("");
    const maxLength = 20; // 최대 글자 수 설정
    const [confirmCurrentUserPw, setConfirmCurrentUserPw] = useState(false);
    const [confirmNewUserPw, setConfirmNewUserPw] = useState(false);
    const [confirmEmptyNewUserPw, setConfirmEmptyNewUserPw] = useState(false);
  
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
  
      // 먼저 조건을 로컬 변수로 계산
      const isCurrentPwIncorrect = currentUserPw !== userPw;
      const isNewPwMismatch = newUserPw !== confirmUserPw;
      const isNewPwTooShort = newUserPw.length < 8;
  
      // 상태를 업데이트
      setConfirmCurrentUserPw(isCurrentPwIncorrect);
      setConfirmNewUserPw(isNewPwMismatch);
      setConfirmEmptyNewUserPw(isNewPwTooShort);
  
      if (!isCurrentPwIncorrect && !isNewPwMismatch && !isNewPwTooShort) {
        let member = { userPw: newUserPw };
        // Update password via API call
        updateMember(user.id, member)
          .then((res) => {
            const updatedUser = { ...user, userPw: newUserPw };
            setUser(updatedUser);
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

    // Enter 키가 눌리면 변경 버튼이 클릭되도록 설정
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        changeUserPw();
      }
    };
  
    return (
      <>
        <div className={"modal-container"} onKeyDown={handleKeyDown}>
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
              {confirmEmptyNewUserPw && (
              <span className="error-message">
                8자 이상 입력해주세요!
              </span>
              )}
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
              <button type="submit" className="btn" onClick={changeUserPw}>
                변경
              </button>
              <button type="button" className="btn" onClick={closeModal}>
                닫기
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default MemberPwUpdate;