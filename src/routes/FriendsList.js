import React, { useState, useEffect } from 'react';
import MyPageLeftSideBar from '../components/MyPageLeftSideBar';
import './css/MyPage.css';
import { FaUserFriends } from 'react-icons/fa';
import { TiUserDelete } from 'react-icons/ti';
import { listFriends } from '../services/FriendService';
import './css/Friends.css';
import { PiFinnTheHumanDuotone } from 'react-icons/pi';
import { IoPersonAddSharp } from 'react-icons/io5';
import { BiSolidUserX } from 'react-icons/bi';

const FriendsList = () => {
  const [friendsData, setFriendsData] = useState([]);
  const user = sessionStorage.getItem('user');

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
                <IoPersonAddSharp className="addFriendIcon" size={50} />
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
                        <PiFinnTheHumanDuotone size={150} />
                        &nbsp;&nbsp; &nbsp;&nbsp;
                        {friend.name} ({friend.userId})
                      </div>
                      <div className="deleteButton">
                        <TiUserDelete size={50} />
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
                  <BiSolidUserX size={350} color="red" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default FriendsList;
