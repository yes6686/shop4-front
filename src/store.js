import {configureStore, createSlice} from '@reduxjs/toolkit'
import cart from './store/cartSlice.js'
import user from './store/userSlice.js'


export default configureStore ({
    reducer:{
        user : user.reducer,
        cart : cart.reducer
    }
})