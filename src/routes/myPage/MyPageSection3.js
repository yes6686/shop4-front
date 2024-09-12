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
