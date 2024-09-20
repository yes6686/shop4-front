import React, { useState, useEffect } from 'react';
import MyPageLeftSideBar from '../components/MyPageLeftSideBar';
import './css/MyPage.css';
import { FaUserFriends } from 'react-icons/fa';
import { PiFinnTheHumanDuotone } from 'react-icons/pi';
import { BiSolidUserX } from 'react-icons/bi';
import { requestedListFriends } from '../services/FriendService';
import { rejectFriend } from '../services/FriendService';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { acceptFriend } from '../services/FriendService';
import { useDispatch, useSelector } from 'react-redux';
import { setRequestedFriends } from '../store/requestedFriendsSlice'; // 액션 가져오기
import { IoPersonAddSharp } from 'react-icons/io5';
import FriendsRequestModal from '../components/Friend/FriendsRequestModal';

function RequestedFriends() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 관리
  const dispatch = useDispatch();
  const requestedFriends = useSelector(
    (state) => state.friendRequests.requestedFriends
  );
  const user = sessionStorage.getItem('user');
  const memberId = JSON.parse(user)?.id;

  useEffect(() => {
    if (memberId) {
      getRequestedFriendsData(memberId);
    }
  }, [memberId]);

  // 친구 요청 목록 가져오는 함수
  function getRequestedFriendsData(memberId) {
    requestedListFriends(memberId)
      .then((response) => {
        dispatch(setRequestedFriends(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // 거절버튼 클릭 리스너
  function handleDelete(friendId) {
    rejectFriend(memberId, friendId)
      .then(() => {
        dispatch(
          setRequestedFriends(
            requestedFriends.filter((friend) => friend.userId !== friendId)
          )
        );
      })
      .catch((error) => {
        console.error('Failed to reject friend request:', error);
      });
  }

  // 수락버튼 클릭 리스너
  function handleAccept(friendId) {
    acceptFriend(memberId, friendId)
      .then(() => {
        dispatch(
          setRequestedFriends(
            requestedFriends.filter((friend) => friend.userId !== friendId)
          )
        );
      })
      .catch((error) => {
        console.error('Failed to accept friend request:', error);
      });
  }

  // 모달 열기
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="myPageContainer">
      <MyPageLeftSideBar />
      <div className="rightContent">
        <br />
        <h2
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            fontWeight: 'bold',
          }}
        >
          <FaUserFriends style={{ fontSize: '50px', marginRight: '10px' }} />{' '}
          친구 요청
        </h2>

        <table className="friendsTable">
          <thead>
            <tr>
              <th></th>
              <th className="tableHeader">
                <IoPersonAddSharp
                  className="addFriendIcon"
                  size={60}
                  onClick={handleOpenModal}
                />
              </th>
            </tr>
          </thead>
          <hr
            style={{
              position: 'absolute',
              left: '11.8%', // 테이블보다 왼쪽으로 더 연장
              width: '42.9%', // 테이블보다 더 긴 수평선
              border: '1px solid #ccc',
              margin: '0',
            }}
          />
          <tbody>
            {requestedFriends.map((friend) => (
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
      {isModalOpen && (
        <FriendsRequestModal
          memberId={memberId}
          onClose={handleCloseModal} // 모달 닫기 함수 전달
        />
      )}
    </div>
  );
}

export default RequestedFriends;
