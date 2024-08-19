import { createSlice } from '@reduxjs/toolkit';

let cart = createSlice({
  name: 'item',
  initialState: [
    // 장바구니 상품
  ],
  reducers: {
    addCount(state, action) {
      // 버튼 누른 id와 같은 id값을 갖는 state의 stock 개수 증가
      let findProductIndex = state.findIndex((x) => x.id === action.payload);
      state[findProductIndex].stock++;
    },
    subCount(state, action) {
      // 버튼 누른 id와 같은 id값을 갖는 state의 stock 개수 감소
      let findProductIndex = state.findIndex((x) => x.id === action.payload);
      if (state[findProductIndex].stock > 0) state[findProductIndex].stock--;
    },
    addItem(state, action) {
      // 주문하기 버튼 클릭 시 장바구니에 추가
      state.push(action.payload);
    },
  },
});

export let { addCount, addItem, subCount } = cart.actions;

export default cart;
