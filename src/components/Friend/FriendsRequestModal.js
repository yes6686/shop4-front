import React, { useState, useEffect } from "react";
import { requestFriend } from "../../services/FriendService";
import styles from "./FriendsRequestModal.module.css";

const FriendsRequestModal = ({ memberId, onClose }) => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const user = sessionStorage.getItem("user");
  const selfID = JSON.parse(user)?.userId;

  // 애니메이션을 위한 상태 추가
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 모달이 열릴 때 애니메이션 효과 추가
    setIsVisible(true);
  }, []);

  const handleAddFriend = () => {
    if (!userId) {
      setMessage("사용자 ID를 입력해주세요.");
      setTimeout(() => setMessage(""), 1500);
      return;
    }
    if (userId === selfID) {
      setMessage("다른 사람의 ID를 입력해주세요.");
      setTimeout(() => setMessage(""), 1500);
      return;
    }

    setLoading(true);

    requestFriend(memberId, userId)
      .then((response) => {
        const success = response.data;
        if (success) {
          setMessage(`${userId}님에게 친구 요청을 보냈습니다!!`);
        } else {
          setMessage("이미 친구이거나 없는 ID입니다!");
        }
      })
      .catch(() => {
        setMessage("친구 요청을 보내는 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => setMessage(""), 1500);
      });
  };

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose(); // 애니메이션이 끝난 후 모달을 닫음
    }, 300);
  };

  return (
    <div
      className={`${styles.modalOverlay} ${isVisible ? styles.visible : ""}`}
    >
      <div
        className={`${styles.modalContent} ${
          isVisible ? styles.fadeIn : styles.fadeOut
        }`}
      >
        <div className={styles.gridCenter}>
          <h2>친구 요청</h2>
        </div>
        <div className={`input-group input-group-lg ${styles.inputGroup}`}>
          <span className={`input-group-text ${styles.inputGroupText}`}>
            ID
          </span>
          <input
            type="text"
            className={`form-control ${styles.formControl}`}
            placeholder="친구의 ID를 입력하세요"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.flexContainerRequestF}>
          <button
            type="button"
            className={`btn btn-primary ${styles.btnPrimary}`}
            onClick={handleAddFriend}
            disabled={loading}
          >
            {loading ? "요청 중..." : "친구 요청"}
          </button>
        </div>
        <div className={styles.flexContainer}>
          <button
            type="button"
            className={`btn btn-danger ${styles.btnDanger}`}
            onClick={closeModal}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendsRequestModal;
