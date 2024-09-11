import React from 'react';
import MyPageLeftSideBar from '../components/MyPageLeftSideBar';
import './css/MyPage.css';

function FriendsList() {
  return (
    <div className="myPageContainer">
      <MyPageLeftSideBar />
      <div className="rightContent"></div>
    </div>
  );
}
export default FriendsList;
