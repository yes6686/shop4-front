import { toast } from "react-toastify";
import React, { useState } from "react";
import { updateMember } from "../../services/MemberService.js";
import MemberPwUpdate from "./MemberPwUpdate.js";
// 로그인 정보 컴포넌트
function MyPageSection2({ user, setUser }) {
    const [userEmail, setUserEmail] = useState(user.email);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const handleSaveEmail = () => {
      // 이메일 저장 로직 추가
      setIsEditingEmail(false);
    };
  
    // 모달 창
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
      setModalOpen(false);
    };
  
    //이메일 변경 로직
    const changeUserEmail = () => {
      let member = { email: userEmail };
      // Update email via API call
      updateMember(user.id, member)
        .then((res) => {
          const updatedUser = { ...user, email: userEmail };
          setUser(updatedUser);
          console.log("이메일 변경 성공!");
          sessionStorage.setItem("user", JSON.stringify(res.data));
          toast.success("이메일 변경이 완료되었습니다."); // Show success toast
        })
        .catch((error) => {
          console.error("이메일 변경 실패", error);
          toast.error("이메일 변경에 실패했습니다."); // Show error toast
        });
    };
  
    return (
      <>
        <div className="myPageSection2">
          <h5 style={{ fontWeight: "bold" }}>로그인 정보</h5>
          {/* 이메일 부분 */}
          <div className="list">
            <div>
              <label>이메일 주소</label>
              <br />
  
              {isEditingEmail ? (
                <input
                  type="email"
                  className="form-control"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              ) : (
                <span>{userEmail}</span>
              )}
            </div>
  
            <button
              className="btn"
              type="button"
              onClick={() => {
                if (isEditingEmail) {
                  handleSaveEmail(); // 이메일 저장 로직 실행
                  changeUserEmail();
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
                closeModal={closeModal}
                user={user}
                setUser={setUser}
              />
            )}
          </div>
        </div>
      </>
    );
  }

  export default MyPageSection2;