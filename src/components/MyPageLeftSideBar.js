import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../routes/css/MyPage.css';
import { requestedListFriends } from '../services/FriendService';

const MyPageLeftSideBar = () => {
  const [friendRequestsCount, setFriendRequestsCount] = useState(0);
  const user = sessionStorage.getItem('user');
  const userData = JSON.parse(user); // 문자열로 저장된 user를 객체로 변환

  useEffect(() => {
    if (userData && userData.id) {
      requestedListFriends(userData.id)
        .then((response) => {
          if (response && response.data) {
            setFriendRequestsCount(response.data.length); // 친구 요청 수 설정
          }
        })
        .catch((error) => {
          console.error('친구 요청 목록을 가져오는 데 실패했습니다.', error);
        });
    }
  }, [userData.id]); // 의존성 배열에 userData.id 추가

  return (
    <div className="myPageContainer">
      <div className="leftContent">
        <h4 style={{ fontWeight: 'bold', marginLeft: '30px' }}>마이페이지</h4>
        <br />
        <ul style={{ listStyleType: 'none' }}>
          <h5
            className="headLine"
            style={{ fontWeight: 'bold', marginBottom: '15px' }}
          >
            내 정보
          </h5>
          <li>
            <Link to="/myPage">프로필 정보</Link>
          </li>
          <li>주소록</li>
          <li>
            <Link to="/friendsList">친구 목록</Link>
          </li>
          <li style={{ position: 'relative' }}>
            <Link to="/requestedFriends">친구 요청</Link>
            {friendRequestsCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '5px 8px',
                  fontSize: '12px',
                  minWidth: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {friendRequestsCount}
              </span>
            )}
          </li>
          <li>결제 정보</li>
        </ul>
        <br />
        <ul style={{ listStyleType: 'none' }}>
          <h5 style={{ fontWeight: 'bold', marginBottom: '15px' }}>
            쇼핑 정보
          </h5>
          <li>구매 내역</li>
          <li>관심 상품</li>
        </ul>
      </div>
    </div>
  );
};

export default MyPageLeftSideBar;
