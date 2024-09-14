import { createSlice } from '@reduxjs/toolkit';

let friendRequests = createSlice({
  name: 'friendRequests',
  initialState: {
    requestedFriends: [],
  },
  reducers: {
    setRequestedFriends(state, action) {
      state.requestedFriends = action.payload;
    },
  },
});

export let { setRequestedFriends } = friendRequests.actions;
export default friendRequests;
