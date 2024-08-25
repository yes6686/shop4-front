import { configureStore } from '@reduxjs/toolkit';
import user from './store/userSlice.js';
import recentlyViewed from './store/recentlyViewedSlice.js';
import search from './store/searchSlice.js';

export default configureStore({
  reducer: {
    user: user.reducer,

    recentlyViewed: recentlyViewed.reducer,

    search: search.reducer
  },
});
