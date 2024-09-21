import styles from "./css/Payment.module.css";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMember } from "../services/MemberService";
import requestPay from "../components/RequestPay";

function Payment() {
  let userInfo = JSON.parse(sessionStorage.getItem("user"));
  let [copyUser, setCopyUser] = useState({});
  let [cartData, setCartData] = useState([]);
  let [receiver, setReceiver] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const { state } = useLocation();
  let products = Array.from(state);
  let [totalPrice, setTotalPrice] = useState(0);
  let navigator = useNavigate();

  const id = userInfo.id;

  useEffect(() => {
    const initMembers = async () => {
      await getMember(id).then((response) => {
        setCopyUser(response.data);
      });
    };
    initMembers();
  }, [id]);

  useEffect(() => {
    setCartData(products);
  }, []);

  useEffect(() => {
    let tmp = 0;
    cartData.forEach((item) => {
      tmp += item.quantity * item.goods.price;
    });
    setTotalPrice(tmp);
  }, [cartData]);

  const handlePayment = async () => {
    try {
      const result = await requestPay(cartData, receiver, totalPrice);
      if (result.success) {
        navigator("/paymentSuccess"); // 성공 시 paymentSuccess 페이지로 이동
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.message || "결제 처리 중 오류가 발생했습니다.");
    }
  };

  const handleCopyBuyerInfo = () => {
    setReceiver({
      name: copyUser.name,
      phone: copyUser.phone,
      email: copyUser.email,
      address: copyUser.address,
    });
  };

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.section1}>
        <h2>Order Summary</h2>
        <OrderList cartData={cartData} />
      </div>

      <div className={styles.section2}>
        <h2>Buyer Information</h2>
        <div className={styles.buyerSection}>
          <h3>Buyer</h3>
          <span>Name</span>
          <input
            type="text"
            className={styles.formControl}
            placeholder={copyUser.name}
            readOnly
          />
          <span>Phone</span>
          <input
            type="text"
            className={styles.formControl}
            placeholder={copyUser.phone}
            readOnly
          />
          <span>Email</span>
          <input
            type="text"
            className={styles.formControl}
            placeholder={copyUser.email}
            readOnly
          />
          <span>Address</span>
          <input
            type="text"
            className={styles.formControl}
            placeholder={copyUser.address}
            readOnly
          />
        </div>

        <div className={styles.receiverSection}>
          <h3>Receiver Information</h3>
          <button className={styles.copyButton} onClick={handleCopyBuyerInfo}>
            Copy Buyer Info
          </button>
          <span>Name</span>
          <input
            type="text"
            className={styles.formControl}
            value={receiver.name}
            onChange={(e) => setReceiver({ ...receiver, name: e.target.value })}
          />
          <span>Phone</span>
          <input
            type="text"
            className={styles.formControl}
            value={receiver.phone}
            onChange={(e) =>
              setReceiver({ ...receiver, phone: e.target.value })
            }
          />
          <span>Email</span>
          <input
            type="text"
            className={styles.formControl}
            value={receiver.email}
            onChange={(e) =>
              setReceiver({ ...receiver, email: e.target.value })
            }
          />
          <span>Address</span>
          <input
            type="text"
            className={styles.formControl}
            value={receiver.address}
            onChange={(e) =>
              setReceiver({ ...receiver, address: e.target.value })
            }
          />
        </div>
      </div>

      <div className={styles.section3}>
        <h2>Payment Information</h2>
        <table className={styles.payTable}>
          <tbody>
            <tr>
              <td>Total Amount</td>
              <td>{totalPrice}</td>
            </tr>
            <tr>
              <td>Total Payment</td>
              <td>{totalPrice}</td>
            </tr>
            <tr>
              <td>Payment Method</td>
              <td>Integrated Payment</td>
            </tr>
          </tbody>
        </table>

        <button className={styles.buyButton} onClick={handlePayment}>
          Purchase
        </button>
        <button className={styles.cancelButton} onClick={() => navigator(-1)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// OrderList 컴포넌트
function OrderList({ cartData }) {
  return (
    <table className={styles.orderTable}>
      <thead>
        <tr>
          <th>Item</th>
          <th>Name</th>
          <th>Option</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {cartData.map((item) => (
          <tr key={item.id}>
            <td>사진</td>
            <td>{item.goods.name}</td>
            <td>옵션</td>
            <td>{item.goods.price}</td>
            <td>{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Payment;
