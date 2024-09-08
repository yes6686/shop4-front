import { createSlice } from '@reduxjs/toolkit';

let recentlyViewed = createSlice({
	name: 'recentlyViewed',
	initialState: [],
	reducers: {
		addRecentlyViewedGoods(state, action) {
			// 최근 본 상품 항목 추가
			state.unshift(action.payload);
		},
		deleteRecentlyViewedGoods(state, action) {
			// 최근 본 상품 항목 삭제
			state.splice(action.payload, 1);
		},
	},
});

export let { addRecentlyViewedGoods, deleteRecentlyViewedGoods } =
	recentlyViewed.actions;

export default recentlyViewed;
