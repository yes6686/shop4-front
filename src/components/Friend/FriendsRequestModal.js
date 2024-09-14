import React, { useState } from 'react';
import { requestFriend } from '../../services/FriendService';

const FriendsRequestModal = ({ memberId, onClose }) => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState(''); // 친구요청 결과 메시지 성공,실패
  const [loading, setLoading] = useState(false); //api호출 로딩

  // 친구 요청 API 호출 함수
  const handleAddFriend = () => {
    if (!userId) {
      setMessage('사용자 ID를 입력해주세요.');
      setTimeout(() => {
        setMessage('');
      }, 1500);
      return;
    }
    setLoading(true);
    requestFriend(memberId, userId)
      .then((response) => {
        const success = response.data;
        if (success) {
          setMessage(`${userId}님에게 친구 요청을 보냈습니다!!`);
        } else {
          setMessage('이미 친구이거나 없는 ID입니다!');
        }
      })
      .catch((error) => {
        setMessage('친구 요청을 보내는 중 오류가 발생했습니다.');
      })
      .finally(() => {
        setLoading(false);
      });
    setTimeout(() => {
      setMessage('');
    }, 1500);
  };

  return (
    <div>
      <div className="modal-container">
        <div className="modal-content">
          <div class="grid-center">
            <h2>친구 요청</h2>
          </div>
          <div className="input-group input-group-lg">
            <span className="input-group-text" id="inputGroup-sizing-lg">
              ID
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="친구의 ID를 입력하세요"
              aria-label="ID"
              aria-describedby="inputGroup-sizing-lg"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          {message && <p>{message}</p>}
          <div className="flex-containerRequestF">
            <button
              type="button"
              class="btn btn-primary"
              onClick={handleAddFriend}
              disabled={loading}
              style={{ width: '200px', height: '60px' }}
            >
              {loading ? '요청 중...' : '친구 요청'}
            </button>
          </div>
          <div className="flex-container">
            <button
              type="button"
              class="btn btn-danger"
              onClick={onClose}
              style={{ width: '150px', height: '50px' }}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FriendsRequestModal;
