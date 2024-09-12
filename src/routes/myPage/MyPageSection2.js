import React, { useState } from "react";
import MemberPwUpdate from "./MemberPwUpdate.js";

import ChangeUserEmail from "./ChangeUserEmail.js";

// 로그인 정보 컴포넌트 (이메일, 비밀번호)
function MyPageSection2({ user, setUser }) {
  
    // 모달 창
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
      setModalOpen(false);
    };
  
    return (
      <>
        <div className="myPageSection2">
          <h5 style={{ fontWeight: "bold" }}>로그인 정보</h5>
          {/* 이메일 부분 */}
          <ChangeUserEmail user={user} setUser={setUser} />
  
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
            ) : (
              <span>{userEmail}</span>
            )}
          </div>

          <button
            className="btn email-btn"
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
            className="btn password-btn"
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

      {/* CSS 스타일 추가 */}
      <style jsx>{`
        .btn {
          transition: all 0.3s ease;
        }

        .email-btn:hover {
          background-color: #4caf50;
          color: white;
          transform: scale(1.05);
        }

        .password-btn:hover {
          background-color: #ff4d4d;
          color: white;
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}

export default MyPageSection2;
