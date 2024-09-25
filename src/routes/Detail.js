import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getGoods } from "../services/GoodsService";
import { addRecentlyViewedGoods } from "../store/recentlyViewedSlice";
import { createcart } from "../services/CartService";
import Comments from "../components/Comments";
import { toast, ToastContainer } from "react-toastify";
import styles from "./css/Detail.module.css";
import { canComment } from "../services/CommentService";

function Detail() {
  let { id } = useParams();
  let [findProduct, setFindProduct] = useState({}); //comment 찾을려고 필요한 변수
  let dispatch = useDispatch();
  let [stock, setStock] = useState();
  let [orderNum, setOrderNum] = useState(1);
  const navigate = useNavigate();

  const [cartItem, setCartItem] = useState({});
  const [directItem, setDirectItem] = useState({});
  const user = sessionStorage.getItem("user");
  const userData = user ? JSON.parse(user) : { id: null }; // Null 체크 후 기본값 설정
  const member_id = userData.id;
  const [canCommentCheck, setCanCommentCheck] = useState(false);

  // 상품 id 바뀔때마다 상품에 대한 정보 새로고침
  useEffect(() => {
    getGoods(id)
      .then((response) => {
        setFindProduct(response.data);
        setStock(response.data.stock);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  // 상품 정보의 id값이 바뀌거나 유저 id값 바뀌면 comment값 갱신
  useEffect(() => {
    if (findProduct.id) {
      // findProduct가 초기화된 후에 canComment 함수 호출
      canComment(member_id, findProduct.id)
        .then((response) => {
          setCanCommentCheck(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error checking comment permission:", error);
        });
    }
  }, [findProduct.id, member_id]);

  //바로 구매 함수
  const handleDirectOrder = () => {
    setDirectItem({
      quantity: orderNum,
      member: { id: member_id },
      goods: { id: findProduct.id },
    });
  };

  // 바로 구매 함수로 directItem 변수 바꿔서 장바구니에 포함시키는 api 호출
  useEffect(() => {
    if (directItem && directItem.member && directItem.goods) {
      createcart(directItem).then((response) => {
        navigate("/payment", {
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
  }, [directItem, navigate, orderNum]);

  // 장바구니에 담기 함수
  const handleOrderClick = () => {
    setCartItem({
      quantity: orderNum,
      member: { id: member_id },
      goods: { id: findProduct.id },
    });
  };

  // handleOrderClick 함수의 setCartItem이 실행될때마다 장바구니에 상품추가
  useEffect(() => {
    // cartItem 변수가 비어있지 않다면 실행
    if (cartItem && cartItem.member && cartItem.goods) {
      createcart(cartItem)
        .then((response) => {
          toast.success("상품이 장바구니에 추가되었습니다!");
        })
        .catch((error) => {
          console.error("There was an error adding the cart item:", error);
        });
    }
  }, [cartItem]);

  useEffect(() => {
    dispatch(addRecentlyViewedGoods(id));
  }, [dispatch, id]);

  // 수량 변경 핸들러
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > stock) {
      toast.warning("최대 수량은 " + stock + "개입니다.");
      setOrderNum(stock);
    } else if (value < 1) {
      toast.warning("최소 1개 이상이어야 합니다.");
      setOrderNum(1);
    } else {
      setOrderNum(value);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            src={findProduct.url}
            className={styles.image}
            alt="Product Image"
          />
        </div>
        <div className={styles.detailsContainer}>
          <h4 className={styles.productTitle}>Name: {findProduct.name}</h4>
          <p className={styles.productDescription}>
            Description: {findProduct.description}
          </p>
          <p className={styles.productPrice}>Price: ${findProduct.price}</p>
          <p className={styles.productStock}>Stock: {findProduct.stock}</p>

          <div className={styles.inputContainer}>
            <input
              type="number"
              value={orderNum}
              min="0"
              max={stock !== undefined ? (stock + 1).toString() : undefined} // stock이 정의된 경우만 max 설정
              className={styles.quantityInput}
              onCompositionStart={(e) => {
                e.target.blur(); // 입력 요소에서 포커스를 제거
                requestAnimationFrame(() => e.target.focus()); // 다음 애니메이션 프레임에서 다시 포커스를 설정
              }}
              onChange={handleQuantityChange} // 핸들러 함수 사용
            />
            <button
              className={styles.buyButton}
              onClick={() => {
                if (userData.id == null) {
                  navigate("/Login");
                } else if (stock === 0) {
                  toast.error("품절입니다.");
                } else {
                  if (orderNum <= 0) {
                    toast.error("한 개 이상 주문해야 합니다.");
                  } else {
                    handleDirectOrder();
                  }
                }
              }}
            >
              바로 구매
            </button>
            <button className={styles.orderButton} onClick={handleOrderClick}>
              장바구니에 담기
            </button>
          </div>
        </div>
      </div>
      <Comments
        goods_id={findProduct.id}
        member_id={member_id}
        canCommentCheck={canCommentCheck}
      />
      <ToastContainer />
    </>
  );
}

export default Detail;
