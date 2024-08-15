import { createSlice } from "@reduxjs/toolkit"

let user = createSlice({
    name : 'user',
    initialState : 'AnYeChan',
    reducers : { // Redux의 state 변경하는 함수 만드는 곳
        changeUserName(){
            return "user"
        }
    }
})

export let {changeUserName} = user.actions

export default user