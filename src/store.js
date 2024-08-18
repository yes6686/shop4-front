import {configureStore} from '@reduxjs/toolkit'
import cart from './store/cartSlice.js'
import user from './store/userSlice.js'
import recentlyViewed from './store/recentlyViewedSlice.js'


export default configureStore ({
    reducer:{
        user : user.reducer,
        cart : cart.reducer,
        recentlyViewed : recentlyViewed.reducer
    }
})