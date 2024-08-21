import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addItem } from './../store/cartSlice';
import { getGoods } from '../services/GoodsService';
import { addRecentlyViewedGoods } from '../store/recentlyViewedSlice';

function Detail() {
  let { id } = useParams();
  let [findProduct, setFindProduct] = useState([]);
  let [alert, setAlert] = useState(true);
  let [tab, setTab] = useState(0);
  let dispatch = useDispatch();
  const [message, setMessage] = useState('');
  let [stock, setStock] = useState();
  let [orderNum, setOrderNum] = useState(1);
  const navigator = useNavigate();
  const isLoggedIn = sessionStorage.getItem('isLoggedIn'); 

  function chkCharCode(event) {
    const validKey = /[^0-9]/g;
    if (validKey.test(event.target)) {
      event.target.value = event.target.value.replace(validKey, '');
    }
  };


  let [fade, setFade] = useState('');

  useEffect(() => { // 천천히 보여주기 효과
    setFade('end');
    return () => {
      setFade('');
    };
  }, []);

  useEffect(() => { // 상품 데이터 get으로 가져오기
    getGoods(id)
      .then((response) => {
        setFindProduct(response.data);
        //재고관리
        setStock(response.data.stock);
      })
      .catch((error) => {
        console.error(error);
      });
  },[]);

  useEffect(() => { // 10초 이내 구매 시 할인 알람
    let timer = setTimeout(() => {
      setAlert(false);
    }, 10000);
    return () => {
      // useEffect가 실행되기 전에 실행됨 (단, mount (X), unmount (O))
      clearTimeout(timer); // 타이머 제거해주는 함수
    };
  }, []);

  const handleOrderClick = () => {
    dispatch(addItem(findProduct));
    setMessage('상품이 장바구니에 추가되었습니다!'); // 메시지 설정
    setTimeout(() => setMessage(''), 10000); // 2초 후 메시지 제거
  };
  
  // 처음 detail페이제에 로드할때 해당상품 id 최근본항목에 저장하기
  useEffect(()=>{
    dispatch(addRecentlyViewedGoods(id))
    console.log(id)
  },[])
  
  return (
    <>
      {alert == true ? (
        <div className="alert alert-warning">10초이내 구매시 할인</div>
      ) : null}
      <div className={'container start ' + fade}>
        <div className="row">
          <div className="col-md-6">
            <img
              src={findProduct.url}
              style={{ width: '90%', height: '450px', objectFit: 'cover' }}
              alt="Product Image"
            />
          </div>
          <div className="col-md-6 product">
            <h4 className="pt-5 product-title">name : {findProduct.name}</h4>
            <p className="product-content">
              description : {findProduct.description}
            </p>
            <p className="product-price">price : {findProduct.price}</p>
            <p className="product-count">stock : {findProduct.stock}</p>

            {/*수량입력*/}
            <input type='number' defaultValue = '1' min={"1"} max={stock}
            style={{height : "60px", width : "100px", marginRight : '12px', fontSize : "30px", outline:'none'} 
            }

            //한글 입력방지해줌
            onCompositionStart={(e)=>{
              e.target.blur();
              requestAnimationFrame(()=>e.target.focus())
            }}

            //stock 갯수 이상 입력 안되게해줌
            onChange={(e) => {
              chkCharCode(e);
              if (e.target.value > stock) {
                e.target.value=stock;
              }
              setOrderNum(e.target.value);
            }}

            >
            </input>

            {/*Detail.css에 buy-button 있음, direct.js로 이동, state로 상품 정보와 주문갯수 전달*/}
            <button className="buy-button"
            onClick={() => {
              if (orderNum <= 0) {
                console.log('한개이상 주문해야합니다')
              }
              else {
                navigator('/direct', { state : [findProduct, orderNum] })
              }
            }}
            >
              바로구매</button>
            <button
              className="order-button"
              style={{marginLeft:'5px'}}
              onClick={handleOrderClick}
            >
              장바구니
            </button>
          </div>
          {/* 메시지 표시 */}
          {message && <div className="alert alert-success">{message}</div>}
        </div>
        <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setTab(0);
              }}
              eventKey="link0"
            >
              버튼0
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setTab(1);
              }}
              eventKey="link1"
            >
              버튼1
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setTab(2);
              }}
              eventKey="link2"
            >
              버튼2
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent tab={tab}/>
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
