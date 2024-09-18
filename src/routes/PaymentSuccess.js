import styles from "./css/PaymentSuccess.module.css";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className={styles.paymentSuccessContainer}>
      <div className={styles.messageContainer}>
        <FaCheckCircle className={styles.icon} />
        <h1>결제가 완료되었습니다!</h1>
        <p>감사합니다. 결제가 성공적으로 처리되었습니다.</p>
        <p>곧 배송이 시작될 예정입니다.</p>
        <div className={styles.buttonGroup}>
          <button className={styles.homeButton} onClick={() => navigate("/")}>
            홈으로 가기
          </button>
          <button
            className={styles.ordersButton}
            onClick={() => navigate("/orders")}
          >
            주문 내역 보기
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
