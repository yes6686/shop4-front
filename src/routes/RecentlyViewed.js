import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { listGoods } from '../services/GoodsService';
import { Button, Table } from 'react-bootstrap';
import './../App.css';

const RecentlyViewed = () => {
  const state = useSelector((state) => state);
  const [shoes, setShoes] = useState([]);
  
  useEffect(() => {
    getAllGoods();
  }, []);
  
  function getAllGoods() {
    listGoods()
      .then((response) => {
        setShoes(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch goods:', error);
      });
  }
  
  const isDataLoaded = shoes.length > 0;

  return (
    <div>
      <br />
      <h2 style={{ textAlign: 'center' }}>최근 본 상품</h2>
      <br />
      {state.recentlyViewed.length === 0 ? (
        <p style={{ textAlign: 'center' }}>최근 본 상품이 없습니다.</p>
      ) : (
        <Table bordered hover>

          <tbody>
            {Array.from(new Set(state.recentlyViewed)).map((viewedItem) => {
              const shoe = shoes[viewedItem - 1];
              if (!shoe) return null;
              
              return (
                <tr key={shoe.id}>
                  <td>
                    <img 
                      src={shoe.url} 
                      alt={shoe.name} 
                      className="product-image" 
                    />
                  </td>
                  <td>
                    <div className='product-title'>{shoe.name}</div>
                    <div className='product-content'>{shoe.description}</div>
                    <div className='product-price'>{shoe.price}원</div>
                    <div className='product-count'>{shoe.stock}개</div>
                    <div className='product-buttons'>
                      <Button 
                        variant="primary" 
                        className="me-2"
                        onClick={() => {/* Handle add to cart action */}}
                      >
                        장바구니담기
                      </Button>
                      <Button 
                        variant="success"
                        className="me-2"
                        onClick={() => {/* Handle order action */}}
                      >
                        주문하기
                      </Button>    
                      <Button 
                        variant="danger" 
                        onClick={() => {/* Handle delete action */}}
                      >
                        삭제
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default RecentlyViewed;
