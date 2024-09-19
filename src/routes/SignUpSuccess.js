import styles from './css/SignUpSuccess.module.css';
import { useNavigate } from 'react-router-dom';

function SignUpSuccess() {
  const navigate = useNavigate();

  const goToHome = () => navigate('/');
  const goToLogin = () => navigate('/login');

  return (
    <div className={styles.successContainer}>
      <div className={styles.messageBox}>
        <h2 className={styles.successMessage}>회원가입에 성공하셨습니다~</h2>
        <div className={styles.buttonContainer}>
          <button className={styles.homeButton} onClick={goToHome}>
            홈으로
          </button>
          <button className={styles.loginButton} onClick={goToLogin}>
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpSuccess;
