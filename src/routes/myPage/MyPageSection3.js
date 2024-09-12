import { toast } from "react-toastify";
import { useState } from "react";
import { updateMember } from "../../services/MemberService.js";

// 개인 정보 컴포넌트
function MyPageSection3({ user }) {
  const [userName, setUserName] = useState(user.name);
  const [isEditingUserName, setIsEditingUserName] = useState(false);

  // 이름 저장 로직
  const handleSaveUserName = () => {
    setIsEditingUserName(false);
  };

  // 이름 변경 로직
  const changeUserName = () => {
    let member = { name: userName };
    updateMember(user.id, member)
      .then((res) => {
        console.log("이름 변경 성공!");
        sessionStorage.setItem("user", JSON.stringify(res.data));
        toast.success("이름 변경이 완료되었습니다.");
      })
      .catch((error) => {
        console.error("이름 변경 실패", error);
        toast.error("이름 변경에 실패했습니다.");
      });
  };

  return (
    <>
      <div className="myPageSection3">
        <h5 style={{ fontWeight: "bold" }}>개인 정보</h5>

        {/* 이름 변경 섹션 */}
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
              className="btn name-btn"
              type="button"
              onClick={() => {
                if (isEditingUserName) {
                  handleSaveUserName(); // 이름 저장 로직 실행
                  changeUserName(); // API 호출
                } else {
                  setIsEditingUserName(true); // 수정 모드로 전환
                }
              }}
            >
              {isEditingUserName ? "저장" : "변경"}
            </button>
          </div>
        </div>

        {/* 휴대폰 번호 변경 섹션 */}
        <div className="list">
          <div>
            <label>휴대폰 번호</label>
            <br />
            <span>{user.phone}</span>
          </div>
          <button className="btn phone-btn" type="button">
            변경
          </button>
        </div>
      </div>

      {/* CSS 스타일 추가 */}
      <style jsx>{`
        .btn {
          transition: all 0.3s ease;
          padding: 8px 12px;
          border-radius: 5px;
        }

        .name-btn:hover {
          background-color: #4caf50;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        }

        .phone-btn:hover {
          background-color: #ff5722;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        }

        .list {
          margin-bottom: 15px;
        }

        .form-control {
          padding: 8px;
          font-size: 14px;
          width: 100%;
          margin-top: 5px;
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
}

export default MyPageSection3;
