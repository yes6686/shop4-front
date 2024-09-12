import { toast } from "react-toastify";
import React, { useState } from "react";
import { updateMember } from "../../services/MemberService.js";

function ChangeUserEmail({user, setUser}) {
    const [userEmail, setUserEmail] = useState(user.email);
    const [isEditingEmail, setIsEditingEmail] = useState(false);

    // 이메일 형식 검사 함수
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    
    //이메일 변경 로직
    const changeUserEmail = () => {
        if (!validateEmail(userEmail)) {
            toast.error("유효하지 않은 이메일 형식입니다.");
            return;
        }

        // 이메일 저장 로직 추가
        setIsEditingEmail(false);
        let member = { email: userEmail };
        
        // Update email via API call
        updateMember(user.id, member)
        .then((res) => {
            const updatedUser = { ...user, email: userEmail }; //user변수중에 email인 값있으면 변경
            setUser(updatedUser); //마이페이지의 user변수에 값 저장
            console.log("이메일 변경 성공!");
            sessionStorage.setItem("user", JSON.stringify(res.data)); //세션스토리지의 user의 email내용 반영
            toast.success("이메일 변경이 완료되었습니다."); // Show success toast
        })
        .catch((error) => {
            console.error("이메일 변경 실패", error);
            toast.error("이메일 변경에 실패했습니다."); // Show error toast
        });
    };

    return(
        <>
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
              type="submit"
              onClick={() => {
                if (isEditingEmail) {
                  changeUserEmail(); //
                } else {
                  setIsEditingEmail(true); // 수정 모드로 전환
                }
              }}
            >
              {isEditingEmail ? "저장" : "변경"}
            </button>
          </div>
        </>
    )
}

export default ChangeUserEmail;