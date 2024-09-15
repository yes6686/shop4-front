import { configureStore } from '@reduxjs/toolkit';
import user from './userSlice.js';
import recentlyViewed from './recentlyViewedSlice.js';
import search from './searchSlice.js';
import isAdmin from './adminSlice.js';
import friendRequests from './requestedFriendsSlice.js';

export default configureStore({
  reducer: {
    user: user.reducer,

    recentlyViewed: recentlyViewed.reducer,

    search: search.reducer,

    isAdmin: isAdmin.reducer,

    friendRequests: friendRequests.reducer,
  },
});
