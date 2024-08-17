import { createSlice } from "@reduxjs/toolkit";

let recentlyViewed = createSlice({
    name : 'recentlyViewed',
    initialState : [],
    reducers : {
        addRecentlyViewedGoods(state, action){ // 주문하기 버튼 클릭 시 장바구니에 추가
            state.unshift(action.payload)
            state = Array.from(new Set(state))
            console.log(state)
        }
    }
})

export let {addRecentlyViewedGoods} = recentlyViewed.actions

export default recentlyViewed