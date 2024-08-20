import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import './../App.css';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlinePicture } from 'react-icons/ai';
import { GiClothes } from 'react-icons/gi';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { FaMoneyBillWave } from 'react-icons/fa';
import { PiPackageDuotone } from 'react-icons/pi';
import { FaCartArrowDown } from 'react-icons/fa6';
import { BsCartPlus } from 'react-icons/bs';
import { BsCartDash } from 'react-icons/bs';
import axios from 'axios';

const Cart = () => {
  let navigate = useNavigate();
  let [cartData, setCartData] = useState([]);
  let [goodsData, setGoodsdata] = useState([]);

  function getAllCart() {
    listGoods()
      .then((response) => {
        setCartData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const iconStyle = {
    fontSize: '24px', // 아이콘 크기를 키움
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
        {/* <tbody>
          {state.cart.map((a, i) => (
            <>
              <tr key={i} style={{ textAlign: 'center', fontSize: '22px' }}>
                <td>{state.cart[i].id}</td>
                <td
                  onClick={() => {
                    // 이미지 클릭 시 이미지 상품으로 경로 이동
                    navigate(`/detail/${state.cart[i].id}`);
                  }}
                >
                  <img className="image" src={'none'}></img>
                </td>
                <td>이름</td>
                <td>갯수</td>
                <td>가격</td>
                <td>무료</td>

                <td>
                  <button style={{ marginRight: '10px' }}>
                    <BsCartPlus />
                  </button>
                  <button>
                    <BsCartDash />
                  </button>
                </td>
              </tr> */}
        {/* </>
          ))}
        </tbody> */}
      </Table>
    </div>
  );
};

export default Cart;
