import React from 'react';
import { Link } from 'react-router-dom';
import '../routes/css/MyPage.css';

const MyPageLeftSideBar = () => {
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
          <li>
            <Link to="/requestedFriends">친구 요청</Link>
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
