import React, { useState, useEffect } from 'react';
import MyPageLeftSideBar from '../components/MyPageLeftSideBar';
import './css/MyPage.css';
import defaultImage from '../../src/images/default.jpg';
import { FaUserFriends } from 'react-icons/fa';
import { TiUserDelete } from 'react-icons/ti';
import { listFriends } from '../services/FriendService';
import { deleteFriend } from '../services/FriendService';
import './css/Friends.css';
import { IoPersonAddSharp } from 'react-icons/io5';
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
        <h2
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            fontWeight: 'bold',
            fontSize: '35px',
          }}
        >
          <FaUserFriends style={{ fontSize: '50px', marginRight: '10px' }} />{' '}
          친구 목록
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
            {friendsData.length > 0 ? (
              friendsData.map((friend) => {
                // Blob 데이터를 URL로 변환

                const imageUrl =
                  friend.userImage && friend.userImage.length > 0
                    ? `data:${friend.imageMimeType};base64,${friend.userImage}`
                    : defaultImage; // userImage가 없으면 기본 이미지 사용

                return (
                  <tr key={friend.id}>
                    <td colSpan="2">
                      <div className="friendRow">
                        <div className="friendItem">
                          <button className="btn image-btn">
                            <img
                              src={imageUrl}
                              alt="Profile"
                              className="profile-img"
                              style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '100%',
                                transition:
                                  'transform 0.3s ease, box-shadow 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow =
                                  '0 4px 10px rgba(0, 0, 0, 0.2)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            />
                          </button>
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
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="2"
                  style={{ fontWeight: 'bold', fontSize: '20px' }}
                >
                  <br />
                  <br />
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
