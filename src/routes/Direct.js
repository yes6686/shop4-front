import { useLocation, useNavigate } from 'react-router-dom';
import { getMember, updateMember } from '../services/MemberService';
import { useEffect, useState } from 'react';
import { getGoods, updateGoods } from '../services/GoodsService';

//direct.css에 테이블 밑 버튼 정보 있음
function Direct() {
	//유저정보, detail 페이지에서 상품 정보, 주문수량 전달받는 코드
	const userInfo = JSON.parse(sessionStorage.getItem('user'));
	const { state } = useLocation();
	//state[0], state[1]은 detail.js에서 각각 findProduct, orderNum
	const productInfo = state[0];
	const orderNum = state[1];
	let [copyUser, setCopyUser] = useState([]);
	let [copyProduct, setCopyProduct] = useState([]);

	useEffect(() => {
		getMember(userInfo.id).then((response) => {
			setCopyUser(response.data);
		});

		getGoods(productInfo.id).then((response) => {
			setCopyProduct(response.data);
		});
	}, []);

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
						<td>상품명</td>
						<td>{productInfo.name}</td>
					</tr>
					<tr>
						<td>수량</td>
						<td>{orderNum}</td>
					</tr>
					<tr>
						<td>가격</td>
						<td>{orderNum * productInfo.price}</td>
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
					onClick={() => {
						console.log(copyUser);
						//잔액 많으면 돈 까고 재고도 깜
						if (copyUser.cash >= productInfo.price * orderNum) {
							updateMember(userInfo.id, {
								cash: copyUser.cash - productInfo.price * orderNum,
							});

							updateGoods(productInfo.id, {
								stock: copyProduct.stock - orderNum,
							});
							//그리고 홈으로 이동
							navigator('/');
						} else {
							console.log('잔액이 부족합니다..');
						}
					}}
				>
					구매하다
				</button>
				{/*cancel-button : direct.css에있음*/}
				<button
					className="cancel-button"
					style={{ textAlign: 'center', margin: '5px' }}
					onClick={() => {
						navigator(-1);  // 이전 페이지로 이동
					}}
				>
					취소하다
				</button>
			</div>
		</div>
	);
}

export default Direct;
