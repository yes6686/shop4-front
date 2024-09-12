import { toast} from "react-toastify";
import {useState } from "react";
import { updateMember } from "../../services/MemberService.js";


function ChangeUserName({user}) {
    const [userName, setUserName] = useState(user.name);
    const [isEditingUserName, setIsEditingUserName] = useState(false);
    
    const changeUserName = () => {
        const isUserNameTooShort = userName.length < 1;

        // 1자라도 입력해야 실행
        if(!isUserNameTooShort){
            let member = { email: userName };
            setIsEditingUserName(false);

            // 이름 변경 API 요청
            updateMember(user.id, member)
            .then((res) => {
                sessionStorage.setItem("user", JSON.stringify(res.data));
            })
            .catch((error) => {
                console.error("이름 변경 실패", error);
                toast.error("이름 변경에 실패했습니다.");
            });
        }
        else {
            toast.error("이름을 입력해주세요!");
        }
    };
    
    // Enter 키가 눌리면 변경 버튼이 클릭되도록 설정
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          changeUserName();
        }
    };

    return(
        <>
        <div className="list" onKeyDown={handleKeyDown}>
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
                    changeUserName();
                  } else {
                    setIsEditingUserName(true); // 수정 모드로 전환
                  }
                }}
              >
                {isEditingUserName ? "저장" : "변경"}
              </button>
            </div>
        </div>
        </>

    )
}

export default ChangeUserName;