import './css/Payment.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMember, updateMember } from '../services/MemberService';
import { deleteCart, getCart, listCarts } from '../services/CartService';
import { updateGoods } from '../services/GoodsService';

//결제 페이지
function Payment() {
	//유저정보, 유저정보의 id 키값으로 cart에서 상품들 받아옴
	let userInfo = JSON.parse(sessionStorage.getItem('user'));
	let [copyUser, setCopyUser] = useState([]); //유저 정보
	let [cartData, setCartData] = useState([]); //장바구니 정보
	const { state } = useLocation();
	let products = state;
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
			products.map(async (item) => {
				setCartData((pre) => [...pre, item]);
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
		<div className="paymentContainer">
			<div className="section1">
				<h2 style={{ textAlign: 'center', marginTop: '20px' }}>
					ORDER
				</h2>
				<br />
				<hr />
				<OrderList cartData={cartData} />
			</div>

			<div className="section2">
				<h2 style={{ textAlign: 'center' }}>INFORMATION</h2>
				<br />
				<hr />
				<div className="buyerSection">
					<h3>Buyer</h3>
					<hr />
					<span>Name</span>
					<input
						type="text"
						className="form-control"
						placeholder={copyUser.name}
					/>

					<br />

					<span>TEL</span>
					<input
						type="text"
						className="form-control"
						placeholder={copyUser.phone}
					/>

					<br />

					<span>EMAIL</span>
					<input
						type="text"
						className="form-control"
						placeholder={copyUser.email}
					/>

					<br />

					<span>ADRESS</span>
					<input
						type="text"
						className="form-control"
						placeholder={copyUser.address}
					/>
				</div>

				<br />
				<hr style={{ width: '20%' }} />
				<br />

				<div className="receiverSection">
					<h3>RECEIVER</h3>
					<hr />

					<button type="button">위와 통일</button>

					<br />
					<br />

					<span>Name</span>
					<input type="text" className="form-control"></input>

					<br />

					<span>TEL</span>
					<input type="text" className="form-control"></input>

					<br />

					<span>EMAIL</span>
					<input type="text" className="form-control"></input>

					<br />

					<span>ADRESS</span>
					<input type="text" className="form-control"></input>
				</div>
			</div>

			<br />
			<br />

			<div className="section3">
				{/*결제정보 테이블*/}
				<h2>결제 정보</h2>
				<table
					className="direct-table"
					style={{ margin: '0 auto', width: '100%' }}
				>
					<tbody>
						<tr>
							<td>총액</td>
							<td>{totalPrice}</td>
						</tr>
						<tr>
							<td>총결제액</td>
							<td>{totalPrice}</td>
						</tr>
						<tr>
							<td>결제방식</td>
							<td>통합결제?</td>
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
		</div>
	);
}

function OrderList({ cartData }) {
	console.log(cartData);
	return (
		<>
			{/* 상품 정보들 */}
			<table style={{ width: '90%' }}>
				<thead
					style={{
						backgroundColor: 'black',
						color: 'white',
						height: '40px',
						fontSize: '20px',
						fontWeight: 'bold',
					}}
				>
					<tr>
						<td style={{ width: '10%' }}>Item</td>
						<td style={{ width: '30%' }}>Name</td>
						<td style={{ width: '10%' }}>option</td>
						<td style={{ width: '10%' }}>Price</td>
						<td style={{ width: '10%' }}>Quantity</td>
					</tr>
				</thead>
				<tbody style={{ fontSize: '14px' }}>
					{cartData.map((item) => (
						<tr key={item.id} style={{ height: '100px' }}>
							<td>사진</td>
							<td>{item.goods.name}</td>
							<td>옵션</td>
							<td>{item.goods.price}</td>
							<td>{item.quantity}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

export default Payment;
