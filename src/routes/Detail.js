import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getGoods } from '../services/GoodsService';
import { addRecentlyViewedGoods } from '../store/recentlyViewedSlice';
import { createcart } from '../services/CartService';

function Detail() {
  let { id } = useParams();
  let [findProduct, setFindProduct] = useState([]);
  let [alert, setAlert] = useState(true);
  let dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [cartItem, setCartItem] = useState({});
  let [fade, setFade] = useState('');


  const user = sessionStorage.getItem('user');
  const userData = user ? JSON.parse(user) : { id: null }; // Null 체크 후 기본값 설정
  const member_id = userData.id;
  console.log('로그인한 사용자의 member_id :', member_id);

  useEffect(() => {
    // 천천히 보여주기 효과
    setFade('end');
    return () => {
      setFade('');
    };
  }, []);

  useEffect(() => {
    // 상품 데이터 get으로 가져오기
    getGoods(id)
      .then((response) => {
        setFindProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleOrderClick = () => {
    setCartItem({
      quantity: 1,
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
          setMessage('상품이 장바구니에 추가되었습니다!'); // 메시지 설정
          setTimeout(() => setMessage(''), 2000); // 2초 후 메시지 제거
          console.log('cartItem:', cartItem);
        })
        .catch((error) => {
          console.error('There was an error adding the cart item:', error);
        });
    }
  }, [cartItem]);

  // 처음 detail페이제에 로드할때 해당상품 id 최근본항목에 저장하기
  useEffect(() => {
    dispatch(addRecentlyViewedGoods(id));
    console.log(id);
  }, []);

  return (
    <>
      <div className={'container start ' + fade}>
        <div className="row">
          <div className="col-md-6">
            <img
              src={findProduct.url}
              style={{ width: '90%', height: '100%'}}
              alt="Product Image"
            />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5 product-title">name : {findProduct.name}</h4>
            <p className="product-content">
              description : {findProduct.description}
            </p>
            <p className="product-price">price : {findProduct.price}</p>
            <p className="product-count">stock : {findProduct.stock}</p>
            <button
              className="btn btn-danger order-button"
              onClick={handleOrderClick}
            >
              장바구니에 담기
            </button>
          </div>
          {/* 메시지 표시 */}
          {message && <div className="alert alert-success">{message}</div>}
        </div>
      </div>
    </>
  );
}

function TabContent({ tab }) {
  let [fade, setFade] = useState('');

  useEffect(() => {
    // automatic batching 기능 방지를 위한 setTimeout() 사용
    let timer = setTimeout(() => {
      setFade('end');
    }, 100);
    return () => {
      clearTimeout(timer);
      setFade('');
    };
  }, [tab]);

  return (
    <div className={'start ' + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
}

export default Detail;
