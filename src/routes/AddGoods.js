import { useState } from 'react';
import './css/AddGoods.css';
import './css/Detail.css';
import './css/Direct.css';

function AddGoods() {
	let [item, setItem] = useState({
		name: '',
	});

	return (
		<>
			<div className="AddDiv">
				<h2 style={{ textAlign: 'center' }}>상품추가페이지임</h2>
				상품명 <input></input> <br />
				가격 <input></input> <br />
				상품 설명 <input></input> <br />
				재고수 <input></input> <br />
				상품 이미지
				<input></input>
				카테고리
				<select onChange={() => {}}>
					<option selected>신발</option>
					<option>상의</option>
					<option>하의</option>
					<option>모자</option>
				</select>
				<br />
				<div style={{ margin: '0 auto' }}>
					<button className="buy-button" style={{ margin: '5px' }}>
						등록하다
					</button>
					<button className="cancel-button">돌아가다</button>
				</div>
			</div>
		</>
	);
}

export default AddGoods;
