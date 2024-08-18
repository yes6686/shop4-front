import { createSlice } from "@reduxjs/toolkit";
// git branch dev test
let recentlyViewed = createSlice({
    name : 'recentlyViewed',
    initialState : [],
    reducers : {
        addRecentlyViewedGoods(state, action){ // 주문하기 버튼 클릭 시 장바구니에 추가
            state.unshift(action.payload)
        }
    }
})

export let {addRecentlyViewedGoods} = recentlyViewed.actions

export default recentlyViewed