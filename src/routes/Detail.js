import './css/Detail.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getGoods } from '../services/GoodsService';
import { addRecentlyViewedGoods } from '../store/recentlyViewedSlice';
import { createcart } from '../services/CartService';
import Comments from '../components/Comments';

//수량 입력받는칸의 수치 조정하면 'orderNum' state 변경되고, 바로구매 / 장바구니 누르면 이 값 전달함

function Detail() {
	let { id } = useParams();
	let [findProduct, setFindProduct] = useState([]);
	let dispatch = useDispatch();
	let [stock, setStock] = useState();
	let [orderNum, setOrderNum] = useState(1);
	const navigate = useNavigate();

	//숫자만 입력받는 로직 위해 있는 코드
	function chkCharCode(event) {
		const validKey = /[^0-9]/g;
		if (validKey.test(event.target)) {
			event.target.value = event.target.value.replace(validKey, '');
		}
	}

	const [cartItem, setCartItem] = useState([]);
	const [directItem, setDirectItem] = useState([]);
	const user = sessionStorage.getItem('user');
	const userData = user ? JSON.parse(user) : { id: null }; // Null 체크 후 기본값 설정
	const member_id = userData.id;

	useEffect(() => {
		// 상품 데이터 get으로 가져오기
		getGoods(id)
			.then((response) => {
				setFindProduct(response.data);
				//재고관리
				setStock(response.data.stock);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleDirectOrder = () => {
		setDirectItem({
			quantity: orderNum,
			member: {
				id: member_id,
			},
			goods: {
				id: findProduct.id,
			},
		});
	};

	useEffect(() => {
		if (directItem && directItem.member && directItem.goods) {
			createcart(directItem).then((response) => {
				navigate('/payment', {
					state: [
						{
							goods: response.data.goods,
							member: response.data.member,
							id: response.data.id,
							quantity: orderNum,
						},
					],
				});
			});
		}
	}, [directItem]);

	//장바구니에 담기 온클릭리스너
	const handleOrderClick = () => {
		setCartItem({
			quantity: orderNum,
			member: {
				id: member_id,
			},
			goods: {
				id: findProduct.id,
			},
		});
	};

	useEffect(() => {
		if (cartItem && cartItem.member && cartItem.goods) {
			createcart(cartItem)
				.then((response) => {
					console.log('Cart item added successfully:', response.data);
					alert('상품이 장바구니에 추가되었습니다!'); // 메시지 설정
				})
				.catch((error) => {
					console.error(
						'There was an error adding the cart item:',
						error
					);
				});
		}
	}, [cartItem]);

	// 처음 detail페이제에 로드할때 해당상품 id 최근본항목에 저장하기
	useEffect(() => {
		dispatch(addRecentlyViewedGoods(id));
	}, []);

	return (
		<>
			<div className={'container'}>
				<div className="row">
					<div className="col-md-6">
						<img
							src={findProduct.url}
							style={{ width: '90%', height: '100%' }}
							alt="Product Image"
						/>
					</div>
					<div className="col-md-6">
						<h4 className="pt-5 product-title">
							name : {findProduct.name}
						</h4>
						<p className="product-content">
							description : {findProduct.description}
						</p>x
						<p className="product-price">
							price : {findProduct.price}
						</p>
						<p className="product-count">
							stock : {findProduct.stock}
						</p>

						{/*수량입력*/}
						<input
							type="number"
							defaultValue="1"
							min={'1'}
							max={stock}
							style={{
								height: '60px',
								width: '100px',
								marginRight: '12px',
								fontSize: '30px',
								outline: 'none',
							}}
							//한글 입력방지해줌
							onCompositionStart={(e) => {
								e.target.blur();
								requestAnimationFrame(() => e.target.focus());
							}}
							//stock 갯수 이상 입력 안되게해줌
							onChange={(e) => {
								chkCharCode(e);
								if (e.target.value > stock) {
									e.target.value = stock;
								}
								setOrderNum(e.target.value);
							}}
						></input>

						{/*Detail.css에 buy-button 있음, direct.js로 이동, state로 상품 정보와 주문갯수 전달*/}
						<button
							className="buy-button"
							onClick={() => {
								if (userData.id == null) {
									navigate('/Login');
								} else if (stock == 0) {
									alert('품절입니다.');
								} else {
									if (orderNum <= 0) {
										alert('한개이상 주문해야합니다');
									} else {
										handleDirectOrder();
									}
								}
							}}
						>
							바로구매
						</button>
						<button
							className="order-button"
							style={{ marginLeft: '5px' }}
							onClick={handleOrderClick}
						>
							장바구니에 담기
						</button>
					</div>
				</div>
			</div>
			<br />
			<br />
			<br />
			<Comments goods_id={findProduct.id} member_id={member_id} />
		</>
	);
}
export default Detail;
