import { toast} from "react-toastify";
import {useState } from "react";
import { updateMember } from "../../services/MemberService.js";

// 개인 정보 컴포넌트
function MyPageSection3({ user }) {
    const [userName, setUserName] = useState(user.name);
    // 유저 이름 변경
    const [isEditingUserName, setIsEditingUserName] = useState(false);
  
    const handleSaveUserName = () => {
      setIsEditingUserName(false);
    };
  
    const changeUserName = () => {
      let member = { email: userName };
      // Update email via API call
      updateMember(user.id, member)
        .then((res) => {
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
      </>
    );
  }

  export default MyPageSection3;