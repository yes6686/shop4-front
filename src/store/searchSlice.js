import { createSlice } from "@reduxjs/toolkit"

let search = createSlice({
    name : 'search',
    initialState : "",
    reducers : { // Redux의 state 변경하는 함수 만드는 곳
        searchInfo(state, action){
            let copy = [...state]
            copy = action.payload
            state = copy
            return state
        }
    }
})

export let {searchInfo} = search.actions

export default search