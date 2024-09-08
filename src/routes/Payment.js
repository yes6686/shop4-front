import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMember, updateMember } from '../services/MemberService';
import { deleteCart, getCart, listCarts } from '../services/CartService';
import { updateGoods } from '../services/GoodsService';

function Payment() {
	//유저정보, 유저정보의 id 키값으로 cart에서 상품들 받아옴
	let userInfo = JSON.parse(sessionStorage.getItem('user'));
	let [copyUser, setCopyUser] = useState([]);
	let [cartData, setCartData] = useState([]);
	const { state } = useLocation();
	let products = Array.from(state);
	let [flag, setFlag] = useState(0);

	const id = userInfo.id;
	//장바구니 상품들 총 결제금액 변수
	let [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		const initMembers = async () => {
			await getMember(id).then((response) => {
				setCopyUser(response.data);
			});
		};
		initMembers();
	}, [id]);

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

	useEffect(() => {
		let tmp = 0;
		cartData.map((item) => {
			tmp += item.quantity * item.goods.price;
		});
		setTotalPrice(tmp);
	}, [cartData]);

	let navigator = useNavigate();

	return (
		<div
			className="direct-body"
			style={{ width: '50%', textAlign: 'left', margin: '0 auto' }}
		>
			<br />

			<h2>결제</h2>
			<hr style={{ height: '3px', background: 'black' }} />
			<br />

			<h2>구매자 정보</h2>
			<hr />

			{/*구매자정보 테이블*/}
			<table
				className="direct-table"
				style={{ margin: '0 auto', width: '100%' }}
			>
				<tbody>
					<tr>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>이름</td>
						<td>{copyUser.name}</td>
					</tr>
					<tr>
						<td>이메일</td>
						<td>{copyUser.email}</td>
					</tr>
					<tr>
						<td>휴대폰번호</td>
						<td>{copyUser.phone}</td>
					</tr>
				</tbody>
			</table>
			<hr />

			{/*배송정보 테이블*/}
			<h2>배송 정보</h2>
			<table
				className="direct-table"
				style={{ margin: '0 auto', width: '100%' }}
			>
				<tbody>
					<tr>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>이름</td>
						<td>{copyUser.name}</td>
					</tr>
					<tr>
						<td>연락처</td>
						<td>{copyUser.phone}</td>
					</tr>
					<tr>
						<td>주소</td>
						<td>{copyUser.address}</td>
					</tr>
				</tbody>
			</table>
			<hr />

			{/*상품정보 테이블*/}
			<h2>상품 정보</h2>
			<table
				className="direct-table"
				style={{ margin: '0 auto', width: '100%' }}
			>
				<tbody>
					<tr>
						<td>상품명</td>
						<td>수량</td>
					</tr>
					{cartData.map((item) => (
						<tr key={item.id}>
							<td>{item.goods.name}</td>
							<td>{item.quantity}</td>
						</tr>
					))}
				</tbody>
			</table>
			<hr />

			{/*결제정보 테이블*/}
			<h2>결제 정보</h2>
			<table
				className="direct-table"
				style={{ margin: '0 auto', width: '100%' }}
			>
				<tbody>
					<tr>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>결제 금액</td>
						<td>{totalPrice}</td>
					</tr>
					<tr>
						<td>잔액</td>
						<td>{copyUser.cash}</td>
					</tr>
				</tbody>
			</table>

			<div style={{ margin: '0 auto' }}>
				<button
					className="buy-button"
					style={{ textAlign: 'center', margin: '5px' }}
					onClick={async () => {
						//잔액 많으면 돈 까고 재고도 깜
						if (copyUser.cash >= totalPrice) {
							await updateMember(userInfo.id, {
								cash: copyUser.cash - totalPrice,
							});

							cartData.map(async (item) => {
								await updateGoods(item.goods.id, {
									stock: item.goods.stock - item.quantity,
								});
								await deleteCart(item.id);
							});
							navigator('/');
						} else {
							console.log('잔액이 부족합니다.');
						}
						//그리고 홈으로 이동
					}}
				>
					구매하다
				</button>
				{/*cancel-button : direct.css에있음*/}
				<button
					className="cancel-button"
					style={{ textAlign: 'center', margin: '5px' }}
					onClick={() => {
						navigator(-1); // 이전 페이지로 이동
					}}
				>
					취소하다
				</button>
			</div>
		</div>
	);
}

export default Payment;
