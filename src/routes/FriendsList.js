import React, { useState, useEffect } from 'react';
import MyPageLeftSideBar from '../components/MyPageLeftSideBar';
import './css/MyPage.css';
import { FaUserFriends } from 'react-icons/fa';
import { TiUserDelete } from 'react-icons/ti';
import { listFriends } from '../services/FriendService';
import { deleteFriend } from '../services/FriendService';
import './css/Friends.css';
import { PiFinnTheHumanDuotone } from 'react-icons/pi';
import { IoPersonAddSharp } from 'react-icons/io5';
import { BiSolidUserX } from 'react-icons/bi';
import FriendsRequestModal from '../components/Friend/FriendsRequestModal';

const FriendsList = () => {
  const [friendsData, setFriendsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); //모달창 관리
  const user = sessionStorage.getItem('user');
  const memberId = JSON.parse(user)?.id; // 현재 로그인된 사용자 ID

  console.log('isModalOpen :' + isModalOpen);

  useEffect(() => {
    if (user) {
      const userData = JSON.parse(user);
      const member_id = userData.id;
      getFriendsList(member_id);
    }
  }, [user]);

  // 친구 목록 가져오는 함수
  function getFriendsList(member_id) {
    listFriends(member_id)
      .then((response) => {
        setFriendsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // 삭제버튼 클릭 리스너
  function handleDelete(friendId) {
    const userData = JSON.parse(user);
    const member_id = userData.id;
    deleteFriend(member_id, friendId);
    setFriendsData((prev) => {
      return prev.filter((friend) => friend.userId !== friendId);
    });
  }
  // 친구 요청 모달 열기
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
        <br></br>
        <h2>
          &nbsp;
          <FaUserFriends /> 친구 목록
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
          <tbody>
            {friendsData.length > 0 ? (
              friendsData.map((friend) => (
                <tr key={friend.id}>
                  <td colSpan="2">
                    <div className="friendRow">
                      <div className="friendItem">
                        <PiFinnTheHumanDuotone size={160} />
                        &nbsp;&nbsp; &nbsp;&nbsp;
                        {friend.name} ({friend.userId})
                      </div>
                      <div className="deleteButton">
                        <TiUserDelete
                          size={65}
                          onClick={() => {
                            const id = friend.userId;
                            handleDelete(id);
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  style={{ fontWeight: 'bold', fontSize: '20px' }}
                >
                  <br></br>
                  <br></br>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>{' '}
      {isModalOpen && (
        <FriendsRequestModal
          memberId={memberId}
          onClose={handleCloseModal} // 모달 닫기 함수 전달
        />
      )}
    </div>
  );
};
export default FriendsList;
