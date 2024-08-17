import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { listGoods } from '../services/GoodsService';

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
  
  // Check if shoes data is loaded and has items
  const isDataLoaded = shoes.length > 0;
  
  return (
    <div>
      <h2>최근 본 상품</h2>
      <ul>
        {state.recentlyViewed.length === 0 ? (
          <li>최근 본 상품이 없습니다.</li>
        ) : (
          state.recentlyViewed.map((viewedItem, index) => {
            // Ensure the index is within bounds of shoes array
            const shoe = shoes[viewedItem];
            if (!shoe) return null; // Skip if shoe is not available
            
            return (
              <li key={index}>
                <img src={shoe.url} alt={shoe.name} />
                <div>
                  <h3>{shoe.name}</h3>
                  <p>${shoe.price.toFixed(2)}</p>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default RecentlyViewed;
