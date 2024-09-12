import ChangeUserPhone from './ChangeUserPhone.js';
import ChangeUserName from './ChangeUserName.js';
// 개인 정보 컴포넌트
function MyPageSection3({ user }) {
    
    
    return (
      <>
        <div className="myPageSection3">
          <h5 style={{ fontWeight: "bold" }}>개인 정보</h5>
  
          <ChangeUserName user={user}/>
  
          <ChangeUserPhone user={user} />

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
      </>
    );
  }

export default MyPageSection3;
