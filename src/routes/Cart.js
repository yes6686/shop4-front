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

const Cart = () => {
  let navigate = useNavigate();
  let [cartData, setCartData] = useState([]);
  const user = sessionStorage.getItem('user');

  useEffect(() => {
    if (user) {
      const userData = JSON.parse(user);
      const member_id = userData.id;
      getAllCart(member_id);
      console.log('로그인한 사용자의 member_id :', member_id);
    } else {
      console.log('로그인 정보가 없습니다.');
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
    const newQuantity = item.quantity + delta;
    setCartData(
      cartData.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
    updateCart(item.id, { quantity: newQuantity });
  };

  const iconStyle = {
    fontSize: '24px',
  };

  return (
    <div>
      <Table
        bordered
        hover
        style={{ width: '100%', borderCollapse: 'collapse' }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <FaCartArrowDown style={iconStyle} />
            </th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <AiOutlinePicture style={iconStyle} />
            </th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <GiClothes style={iconStyle} />
            </th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <FiShoppingCart style={iconStyle} />
            </th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <FaMoneyBillWave style={iconStyle} />
            </th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <PiPackageDuotone style={iconStyle} />
            </th>
          </tr>
        </thead>
        <tbody>
          {cartData.map((item) => (
            <tr key={item.id} style={{ textAlign: 'center', fontSize: '22px' }}>
              <td>
                <input type="checkbox" />
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
                <button onClick={() => updateQuantity(item, -1)}>
                  <BsCartDash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Cart;
