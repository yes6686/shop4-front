import React, { useState, useEffect } from 'react';
import MyPageLeftSideBar from '../components/MyPageLeftSideBar';
import './css/MyPage.css';
import './css/Friends.css';
import { TiUserDelete } from 'react-icons/ti';
import { FaUserFriends } from 'react-icons/fa';
import { PiFinnTheHumanDuotone } from 'react-icons/pi';
import { BiSolidUserX } from 'react-icons/bi';
import { requestedListFriends } from '../services/FriendService';
import { rejectFriend } from '../services/FriendService';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { acceptFriend } from '../services/FriendService';

function RequestedFriends() {
  const [requestedFriendsData, setRequestedFriendsData] = useState([]);
  const user = sessionStorage.getItem('user');
  const memberId = JSON.parse(user)?.id;

  useEffect(() => {
    if (memberId) {
      getRequestedFriendsData(memberId);
    }
  }, [memberId]);

  //친구 요청 목록 가져오는 함수
  function getRequestedFriendsData(memberId) {
    requestedListFriends(memberId)
      .then((response) => {
        setRequestedFriendsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // 거절버튼 클릭 리스너
  function handleDelete(friendId) {
    rejectFriend(memberId, friendId);
    setRequestedFriendsData((prev) => {
      return prev.filter((friend) => friend.userId !== friendId);
    });
  }
  // 수락버튼 클릭 리스너
  function handleAccept(friendId) {
    acceptFriend(memberId, friendId);
    setRequestedFriendsData((prev) => {
      return prev.filter((friend) => friend.userId !== friendId);
    });
  }

  return (
    <div className="myPageContainer">
      <MyPageLeftSideBar />
      <div className="rightContent">
        <br></br>
        <h2>
          &nbsp;
          <FaUserFriends /> 친구 요청
        </h2>

        <table className="friendsTable">
          <tbody>
            {requestedFriendsData.map((friend) => (
              <tr key={friend.id}>
                <td colSpan="2">
                  <div className="friendRow">
                    <div className="friendItem">
                      <PiFinnTheHumanDuotone size={160} />
                      &nbsp;&nbsp; &nbsp;&nbsp;
                      {friend.name} ({friend.userId})
                    </div>
                    <div className="deleteButton">
                      <FaRegCircleCheck
                        size={65}
                        style={{ color: 'green' }}
                        onClick={() => {
                          const id = friend.userId;
                          handleAccept(id);
                        }}
                      />
                      &nbsp; &nbsp; &nbsp;
                      <FaRegCircleXmark
                        size={65}
                        style={{ color: 'red' }} // 빨간색 적용
                        onClick={() => {
                          const id = friend.userId;
                          handleDelete(id);
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default RequestedFriends;
