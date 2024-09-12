import { toast} from "react-toastify";
import {useState } from "react";
import { updateMember } from "../../services/MemberService.js";

function ChangeUserPhone({user}) {
    const [userPhone, setUserPhone] = useState(user.phone);
    const [isEditingUserPhone, setIsEditingUserPhone] = useState(false);
    
    const changeUserPhone = () => {
        let member = { phone: userPhone };
        setIsEditingUserPhone(false);

        // 전화번호 변경 API 요청
        updateMember(user.id, member)
        .then((res) => {
            sessionStorage.setItem("user", JSON.stringify(res.data));
            console.log("전화번호 변경 성공!");
            toast.success("전화번호 변경이 완료되었습니다.");
        })
        .catch((error) => {
            console.error("이름 변경 실패", error);
            toast.error("이름 변경에 실패했습니다.");
        });
    };

    // Enter 키가 눌리면 변경 버튼이 클릭되도록 설정
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          changeUserPhone();
        }
    };


    return(
        <>
        <div className="list" onKeyDown={handleKeyDown}>
            <div>
              <label>전화번호</label> <br />
              {isEditingUserPhone ? (
                <input
                  type="text"
                  className="form-control"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                />
              ) : (
                <span>{userPhone}</span>
              )}
            </div>

            <div>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  if (isEditingUserPhone) {
                    changeUserPhone();
                  } else {
                    setIsEditingUserPhone(true); // 수정 모드로 전환
                  }
                }}
              >
                {isEditingUserPhone ? "저장" : "변경"}
              </button>
            </div>
        </div>
        </>
    )
}

export default ChangeUserPhone;