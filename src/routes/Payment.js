import './css/Payment.css'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMember} from '../services/MemberService';
import {getCart} from '../services/CartService';
import OrderList from './payment/OrderList.js';
import Information from './payment/Information.js';
import Section3 from './payment/Section3.js';

//결제 페이지
function Payment() {
	//유저정보, 유저정보의 id 키값으로 cart에서 상품들 받아옴
	let userInfo = JSON.parse(sessionStorage.getItem('user'));
	let [copyUser, setCopyUser] = useState([]); //유저 정보
	let [cartData, setCartData] = useState([]); //장바구니 정보
	const { state } = useLocation(); 
	let products = Array.from(state);
	let [flag, setFlag] = useState(0);
	
	const id = userInfo.id;

	//장바구니 상품들 총 결제금액 변수
	let [totalPrice, setTotalPrice] = useState(0);

	// user의 id값이 바뀔때마다 정보 갱신
	useEffect(() => {
		const initMembers = async () => {
			await getMember(id).then((response) => {
				setCopyUser(response.data);
			});
		};
		initMembers();
	}, [id]);

	// 장바구니 상품 목록 갱신(추가)
	useEffect(() => {
		const getCarts = async () => {
			products.map(async (id) => {
				await getCart(id).then((response) => {
					setCartData((pre) => [...pre, response.data]);
				});
			});
		};
		getCarts();
	}, []);

	// 결제 금액 계산 : 장바구니 목록 바뀔때마다 가격도 추가 계산
	useEffect(() => {
		let tmp = 0;
		cartData.map((item) => {
			tmp += item.quantity * item.goods.price;
		});
		setTotalPrice(tmp);
	}, [cartData]);

	let navigator = useNavigate();

	return (
		<div className= "paymentContainer">
			<OrderList cartData={cartData}/>
				
			<Information copyUser={copyUser} />
			
			<br/><br/>

			<Section3 cartData={cartData} copyUser={copyUser} totalPrice={totalPrice} />

		</div>
	);
}

export default Payment;
