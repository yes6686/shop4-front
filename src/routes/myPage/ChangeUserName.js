import { toast} from "react-toastify";
import {useState } from "react";
import { updateMember } from "../../services/MemberService.js";


function ChangeUserName({user}) {
    const [userName, setUserName] = useState(user.name);
    const [isEditingUserName, setIsEditingUserName] = useState(false);
    
    const changeUserName = () => {
        let member = { email: userName };
        setIsEditingUserName(false);

        // Update email via API call
        updateMember(user.id, member)
        .then((res) => {
            sessionStorage.setItem("user", JSON.stringify(res.data));
            console.log("이름 변경 성공!");
            toast.success("이름 변경이 완료되었습니다."); // Show success toast
        })
        .catch((error) => {
            console.error("이름 변경 실패", error);
            toast.error("이름 변경에 실패했습니다."); // Show error toast
        });
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