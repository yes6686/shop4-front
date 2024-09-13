import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listGoods } from "../services/GoodsService";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/RecentlyViewed.css";
import { deleteRecentlyViewedGoods } from "../store/recentlyViewedSlice";
import { createcart } from "../services/CartService";

const RecentlyViewed = () => {
  const state = useSelector((state) => state);
  const [shoes, setShoes] = useState([]);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [cartItem, setCartItem] = useState({});

  const user = sessionStorage.getItem("user");
  const userData = user ? JSON.parse(user) : { id: null }; // Null 체크 후 기본값 설정
  const member_id = userData.id;
  console.log("로그인한 사용자의 member_id :", member_id);

  useEffect(() => {
    if (cartItem && cartItem.member && cartItem.goods) {
      createcart(cartItem)
        .then((response) => {
          console.log("Cart item added successfully:", response.data);
          console.log("cartItem:", cartItem);
        })
        .catch((error) => {
          console.error("There was an error adding the cart item:", error);
        });
    }
  }, [cartItem]);

  useEffect(() => {
    getAllGoods();
  }, []);

  function getAllGoods() {
    listGoods()
      .then((response) => {
        setShoes(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch goods:", error);
      });
  }

  const handleOrderClick = (item) => {
    setCartItem({
      quantity: 1,
      member: {
        id: member_id,
      },
      goods: {
        id: item.id,
      },
    });
    alert("상품이 장바구니에 추가되었습니다!");
  };

  const handleDeleteClick = (index) => {
    dispatch(deleteRecentlyViewedGoods(index));
  };
  const handleBuyClick = (item) => {
    navigate("/direct", { state: [item, 1] });
  };

  return (
    <div>
      <br />
      <h2 className="text-center">최근 본 상품</h2>
      <br />
      {state.recentlyViewed.length === 0 ? (
        <p className="text-center">최근 본 상품이 없습니다.</p>
      ) : (
        <Table bordered hover>
          <tbody>
            {Array.from(new Set(state.recentlyViewed)).map(
              (viewedItem, index) => {
                const shoe = shoes[viewedItem - 1];
                if (!shoe) return null;

                return (
                  <tr key={shoe.id}>
                    <td>
                      <img
                        src={shoe.url}
                        alt={shoe.name}
                        className="product-image"
                        onClick={() => navigate(`/detail/${shoe.id}`)}
                      />
                    </td>
                    <td>
                      <div className="product-title">{shoe.name}</div>
                      <div className="product-content">{shoe.description}</div>
                      <div className="product-price">{shoe.price}원</div>
                      <div className="product-count">{shoe.stock}개</div>
                      <div className="product-buttons">
                        <Button
                          variant="primary"
                          className="me-2"
                          onClick={() => {
                            handleOrderClick(shoe);
                          }}
                        >
                          장바구니담기
                        </Button>
                        <Button
                          variant="success"
                          className="me-2"
                          onClick={() => {
                            handleBuyClick(shoe);
                          }}
                        >
                          주문하기
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            handleDeleteClick(index);
                          }}
                        >
                          삭제
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default RecentlyViewed;
