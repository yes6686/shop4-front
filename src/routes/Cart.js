import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import './../App.css';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlinePicture } from 'react-icons/ai';
import { GiClothes } from 'react-icons/gi';
import { FaMoneyBillWave } from 'react-icons/fa';
import { PiPackageDuotone } from 'react-icons/pi';
import { FaCartArrowDown } from 'react-icons/fa6';
import { BsCartPlus, BsCartDash } from 'react-icons/bs';
import { listCarts, updateCart } from '../services/CartService';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { deleteCart } from '../services/CartService';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckBox from '../components/CheckBox';
import ToastComponent from '../components/ToastComponent';

const Cart = () => {
  let navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const user = sessionStorage.getItem('user');
  const [checkGoods, setcheckGoods] = useState(new Set()); //Set 은 중복없이 유일한값만 저장하는 배열임,cartId가 저장됨 구매시 이용
  const [showAlert, setShowAlert] = useState(false);
  let [toast, setToast] = useState(false);

  useEffect(() => {
    if (user) {
      const userData = JSON.parse(user);
      const member_id = userData.id;
      getAllCart(member_id);
    } else {
    }
  }, [user]);

  function getAllCart(member_id) {
    listCarts(member_id)
      .then((response) => {
        setCartData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const updateQuantity = (item, delta) => {
    //수량증감 핸들러
    const newQuantity = item.quantity + delta;
    if (newQuantity > item.goods.stock) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
    } else if (newQuantity <= 0) {
      deleteCart(item.id);
      setCartData((prev) => {
        return prev.filter((goods) => goods.id !== item.id);
      });
    } else {
      setCartData(
        cartData.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );
      updateCart(item.id, { quantity: newQuantity });
    }
  };

  const checkGoodsHandler = (cartId, isChecked) => {
    if (isChecked) {
      checkGoods.add(cartId); //set은 add로 추가
      setcheckGoods(checkGoods);
    } else if (!isChecked) {
      checkGoods.delete(cartId);
      setcheckGoods(checkGoods);
    }
  };

  const iconStyle = {
    fontSize: '24px',
  };
  return (
    <div>
      {showAlert && (
        <div className="alert alert-danger text-center" role="alert">
          해당 상품의 재고가 부족합니다..!
        </div>
      )}
      <Table
        bordered
        hover
        style={{ width: '100%', borderCollapse: 'collapse' }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: 'center',
                verticalAlign: 'middle',
              }}
            >
              <FaCartArrowDown style={iconStyle} />
            </th>
            <th
              style={{
                textAlign: 'center',
                verticalAlign: 'middle',
              }}
            >
              <AiOutlinePicture style={iconStyle} />
            </th>
            <th
              style={{
                textAlign: 'center',
                verticalAlign: 'middle',
              }}
            >
              <GiClothes style={iconStyle} />
            </th>
            <th
              style={{
                textAlign: 'center',
                verticalAlign: 'middle',
              }}
            >
              <FiShoppingCart style={iconStyle} />
            </th>
            <th
              style={{
                textAlign: 'center',
                verticalAlign: 'middle',
              }}
            >
              <FaMoneyBillWave style={iconStyle} />
            </th>
            <th
              style={{
                textAlign: 'center',
                verticalAlign: 'middle',
              }}
            >
              <PiPackageDuotone style={iconStyle} />
            </th>
          </tr>
        </thead>
        <tbody>
          {cartData.map((item) => (
            <tr key={item.id} style={{ textAlign: 'center', fontSize: '22px' }}>
              <td>
                <CheckBox
                  id={item.id}
                  checkGoodsHandler={checkGoodsHandler} // props로 함수전달
                />
              </td>
              <td
                onClick={() => {
                  navigate(`/detail/${item.goods.id}`);
                }}
              >
                <img
                  className="image"
                  src={`${item.goods.url}`}
                  alt={item.goods.name}
                />
              </td>
              <td>{item.goods.name}</td>
              <td>{item.quantity}</td>
              <td>{item.goods.price}</td>
              <td>무료</td>
              <td>
                <button
                  style={{ marginRight: '10px' }}
                  onClick={() => updateQuantity(item, 1)}
                >
                  <BsCartPlus />
                </button>
                <button
                  style={{ marginRight: '10px' }}
                  onClick={() => updateQuantity(item, -1)}
                >
                  <BsCartDash />
                </button>
                <button
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                    deleteCart(item.id);
                    let delete_id = item.id;
                    setCartData((prev) => {
                      return prev.filter((goods) => goods.id !== delete_id);
                    });
                  }}
                >
                  <MdOutlineDeleteForever />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '20vh' }}
      >
        <button
          className="buy-button"
          onClick={() => {
            console.log(checkGoods);
            //체크수량없으면 토스트 띄우고 안넘어감
            if (checkGoods.size == 0) {
              setToast(true);
            } else {
              navigate('/payment', { state: checkGoods });
            }
          }}
        >
          선택된 상품 구매하기
        </button>
      </div>

      {toast ? (
        <ToastComponent
          msg="상품이 선택되지 않았습니다."
          toast={toast}
          setToast={setToast}
        ></ToastComponent>
      ) : (
        ' '
      )}
    </div>
  );
};

export default Cart;
